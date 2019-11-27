import express = require('express')
import path = require('path')
import { MetricsHandler } from './metrics'

const app = express()
const port: string = process.env.PORT || '8080'

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', __dirname + "/view")
app.set('view engine', 'ejs');

app.get('/', (req: any, res: any) => {
  res.write('Hello world \n\nTo test this application, pass a name in parameters and it will display "Hello name", as well as a button "bring the metrics" that, when clicked, will display two lines showing timestamps.\nExample: localhost:/8080/hello/Laura')
  res.end()
})

app.get(
    '/hello/:name', 
    (req, res) => res.render('hello.ejs', {name: req.params.name})
  )

app.get('/metrics.json', (req: any, res: any) => {
    MetricsHandler.get((err: Error | null, result?: any) => {
      if (err) {
        throw err
      }
      res.json(result)
    })
  })

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})