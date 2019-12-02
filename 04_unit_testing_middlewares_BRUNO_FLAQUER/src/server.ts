import express = require('express')
import bodyparser = require('body-parser')
import path = require('path')
import { MetricsHandler } from './metrics'
import session = require('express-session')
import levelSession = require('level-session-store')

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

const authCheck = function (req: any, res: any, next: any) {
  if (req.session.loggedIn) {
    next()
  } else res.redirect('/login')
}

app.get('/', authCheck, (req: any, res: any) => {
  res.render('index', { name: req.session.username })
})


  /* Session */

  //Create a levelstore
  const LevelStore = levelSession(session)

  app.use(session({
    secret: 'my very secret phrase',
    store: new LevelStore('./db/sessions'),
    resave: true,
    saveUninitialized: true
  }))

  /* User */
  import { UserHandler, User } from './user'
  const dbUser: UserHandler = new UserHandler('./db/users')
  const authRouter = express.Router()

  authRouter.get('/login', (req: any, res: any) => {
    res.render('login')
  })

  authRouter.get('/signup', (req: any, res: any) => {
    res.render('signup')
  })

  authRouter.get('/logout', (req: any, res: any) => {
    delete req.session.loggedIn
    delete req.session.user
    res.redirect('/login')
  })

  app.post('/login', (req: any, res: any, next: any) => {
    dbUser.get(req.body.username, (err: Error | null, result?: User) => {
      if (err) next(err)
      if (result === undefined || !result.validatePassword(req.body.password)) {
        res.redirect('/login')
      } else {
        req.session.loggedIn = true
        req.session.user = result
        res.redirect('/')
      }
    })
  })
  
  app.use(authRouter)
  const userRouter = express.Router()

  userRouter.post('/', (req: any, res: any, next: any) => {
    dbUser.get(req.body.username, function (err: Error | null, result?: User) {
      if (!err || result !== undefined) {
      res.status(409).send("user already exists")
      } else {
        dbUser.save(req.body, function (err: Error | null) {

      if (err) next(err)

      else res.status(201).send("user persisted")
        })
      }
    })
  })

  userRouter.get('/:username', (req: any, res: any, next: any) => {
    dbUser.get(req.params.username, function (err: Error | null, result?: User) {
      if (err || result === undefined) {
        res.status(404).send("user not found")
      } else res.status(200).json(result)
    })
  })

  app.use('/user', userRouter)


  
  /* Listener */
  app.listen(port, (err: Error) => {
    if (err) {
      throw err
    }
    console.log(`server is listening on port ${port}`)
  })