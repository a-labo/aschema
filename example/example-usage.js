'use strict'

const aschema = require('aschema')

// Define a schema object
const userSchema = aschema({
  title: 'User',
  description: 'A user',
  type: 'object',
  properties: {
    id: {
      description: 'The unique identifier for a account',
      type: 'integer'
    },
    accountName: {
      description: 'Name of the account',
      type: 'string'
    }
  },
  required: [
    'id',
    'name'
  ]
})

// Execute validation
let error = userSchema.validate({
  name: 'foo'
})

if (error) {
  console.error(error)
} else {
  console.log('no error!')
}
