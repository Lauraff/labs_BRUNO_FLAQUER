import { expect } from 'chai'
import { Metric, MetricsHandler } from './metrics'
import { LevelDB } from "./leveldb"

const dbPath: string = 'db_test'
var dbMet: MetricsHandler


describe('Metrics', function () {
  before(function () {
    LevelDB.clear(dbPath)
    dbMet = new MetricsHandler(dbPath)
  })

  after(function () {
    dbMet.closeDB()
  })

  describe('#get', function () {
    it('should get empty array on non existing group', function () {
      dbMet.getOne(0, function (err: Error | null, result?: Metric[]) {
        expect(err).to.be.null
        expect(result).to.not.be.undefined
        expect(result).to.be.empty
      })
    })
  })

  describe('#save', function () {
    it('should save data', function () {
      var metrics: Metric[] = []
      metrics.push(new Metric("1384686660000",10))
      dbMet.save(0, metrics, (err: Error | null) => {
        dbMet.getOne(0,function (err: Error | null, result?: Metric[])
        {
            
          expect(err).to.be.null
          expect(result).to.not.be.undefined
          if(result)
            expect(result[0].value).to.equal(10)
            
        })
      })
    })
  })
})