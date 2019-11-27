// Import a module
const http = require('http')
const url = require('url')
const qs = require('querystring')

const serverHandle = function (req, res) {
  const route = url.parse(req.url)
  const path = route.pathname 
  const params = qs.parse(route.query)

  res.writeHead(200, {'Content-Type': 'text/plain'});

  if(path==='/'){
    res.write('Explanation of how /hello works: \n- If you pass the name Charlene in parameter: it will display a short presentation of this person\n- Any other name will display: "Hello name"\n- Anything else will display: error 404 \n' )
  }
  else if (path === '/hello' && 'name' in params ) {
    if(params['name']==='Charlene'){
      res.write('Charlene is a 21 year old french student.')
    }else{
      res.write('Hello ' + params['name'])
    }
  } 
  else{
    res.write('error 404')
  }

  res.end();
}
// Declare an http server
http.createServer(serverHandle).listen(8080)

// curl localhost:8080 or go to http://localhost:8080