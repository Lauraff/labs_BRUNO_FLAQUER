import { LevelDB } from './leveldb'
import WriteStream from 'level-ws'

export class Metric {
    public timestamp: string
    public value: number
  
    constructor(ts: string, v: number) {
      this.timestamp = ts
      this.value = v
    }
  }
  
  export class MetricsHandler {
    private db: any 

    constructor(dbPath: string) {
      this.db = LevelDB.open(dbPath)
    }

    public save(key: number, metrics: Metric[], callback: (error: Error | null) => void) {
      const stream = WriteStream(this.db)
      stream.on('error', callback)
      stream.on('close', callback)
      metrics.forEach((m: Metric) => {
        stream.write({ key: `metrics:${key}:${m.timestamp}`, value: m.value })
      })
      stream.end()
    }

    static get(callback: (error: Error | null, result?: Metric[]) => void) {
      const result = [
        new Metric('2013-11-04 14:00 UTC', 12),
        new Metric('2013-11-04 14:30 UTC', 15)
      ]
      callback(null, result)
    }

    public getAll(callback: (error: Error | null, result: any) => void) {
      let metrics: Metric[] = []
      this.db.createReadStream()
      .on('data', function (data) {
        let timestamp: string = data.key.split(':')[2]
        let metric: Metric = new Metric(timestamp, data.value)
        metrics.push(metric)
        console.log(data.key)
      })
      .on('error', function (err) {
        console.log('Oh my!', err)
        callback(err,null)
      })
      .on('close', function () {
        console.log('Stream closed')
      })
      .on('end', function () {
        callback(null,metrics)
        console.log('Stream ended')
      })
    }

    public getOne(key: number, callback: (error: Error | null, result: any) => void) {
      let metrics: Metric[] = []

      this.db.createReadStream()
      .on('data', function (data) {
        let keyAct : number = data.key.split(":")[1]

        if(key == keyAct)
        {
          let timestamp: string = data.key.split(':')[2]
          let metric: Metric = new Metric(timestamp, data.value)
          metrics.push(metric)
        }
      })
      .on('error', function (err) {
        console.log('Oh my!', err)
        callback(err,null)
      })
      .on('close', function () {
        console.log('Stream closed')
        
      })
      .on('end', function () {
        callback(null,metrics)
        console.log('Stream ended')
      }) 
    }

    public deleteId(key: number, data: any) {
      for(let i=0; i<data.length; i++)
      {
        this.db.del(`metrics:${key}:${data[i].timestamp}`)
      }
    }

    public deleteOne(key: number, timestamp: any) {
      this.db.del(`metrics:${key}:${timestamp}`)
    }
  }
