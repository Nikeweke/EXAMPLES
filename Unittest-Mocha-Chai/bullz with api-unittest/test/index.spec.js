//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let server = require('../config/bootstrap.js')()

require('./api/stack.spec')(server)
require('./api/store.spec')(server)