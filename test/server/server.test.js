import test from 'ava'
import request from 'supertest'
const httpMocks = require('node-mocks-http')

import app from '../../server/server'

let configureDatabase = require('./helpers/database-config')
configureDatabase(test, app)

test.skip('', t => {})
