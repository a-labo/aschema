/**
 * Test case for aschema.
 * Runs with mocha.
 */
'use strict'

const ASchema = require('../lib/aschema.js')
const assert = require('assert')
const co = require('co')

describe('aschema', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Aschema', () => co(function * () {
    let productSchema = new ASchema(
      require('../misc/mocks/mock-schemas/product')
    )
    {
      let json = productSchema.toJSON()
      assert.equal(json.title, 'Product')
    }
    {
      let error = productSchema.validate({
        id: 1234,
        name: 'hoge'
      })
      assert.equal(error, null)
    }
    {
      let error = productSchema.validate({
        id: '1234',
        name: { foo: 'bar' }
      })
      assert.ok(error)
      assert.ok(error instanceof Error)
    }
    {
      assert.throws(() => {
        productSchema.validateToThrow({
          id: '1234',
          name: { foo: 'bar' }
        })
      })
    }
  }))
})

/* global describe, before, after, it */
