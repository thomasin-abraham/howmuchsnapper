var createServer = require('./server')

var server = createServer()

var PORT = process.env.PORT || 3000

if (require.main === module) {
  server.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`)
  })
}
