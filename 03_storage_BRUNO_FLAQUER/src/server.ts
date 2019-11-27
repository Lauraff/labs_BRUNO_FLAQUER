import express = require('express')
import bodyparser = require('body-parser')
import path = require('path')
import { MetricsHandler } from './metrics'

const app = express()
const port: string = process.env.PORT || '8080'

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', __dirname + "/view")
app.set('view engine', 'ejs');

app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

app.get('/', (req: any, res: any) => {
  res.write('Hello world \n\nTo test this application, pass a name in parameters and it will display "Hello name", as well as a button "bring the metrics" that, when clicked, will display two lines showing timestamps.\nExample: localhost:/8080/hello/Laura')
  res.end()
})

app.get(
    '/hello/:name', 
    (req, res) => res.render('hello.ejs', {name: req.params.name})
)

const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')

app.post('/metrics/:id', (req: any, res: any) => {
  dbMet.save(req.params.id, req.body, (err: Error | null) => {
    if (err) throw err
    res.status(200).send()
  })
})

app.get('/metrics/', (req: any, res: any) => {
  dbMet.getAll((err: Error | null, result: any) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.get('/metrics/:id', (req: any, res: any) => {
  dbMet.getOne(req.params.id,(err: Error | null, result: any) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

app.delete('/metrics/:id', (req: any, res: any) => {
 
    dbMet.getOne(req.params.id,(err: Error | null, result: any) => {
      if (err) throw err
      dbMet.deleteId(req.params.id,result)
      res.status(200).send()
    })  
})

app.delete('/metrics/:id/:timestamp', (req: any, res: any) => {
 
  dbMet.deleteOne(req.params.id,req.params.timestamp)
  res.status(200).send()

})

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})