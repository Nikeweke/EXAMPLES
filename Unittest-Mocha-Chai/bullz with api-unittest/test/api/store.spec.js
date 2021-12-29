//Require the dev-dependencies
let chai     = require('chai')
let chaiHttp = require('chai-http')
let should   = chai.should()

chai.use(chaiHttp)

module.exports = function (server) {

  const TEST_API = '/api/store'
  const PARAM = 'name' 

  describe('API - store', () => {
  
    describe(`{GET} ${TEST_API}/:key`, () => {
      it(`it should GET empty object with {success: 0, msg: 'No such key in store'}`, (done) => {
        chai.request(server)
          .get(`${TEST_API}/${PARAM}`)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.eql({success: 0, msg: 'No such key in store'})
            done()
          })
      })
    })

    describe('{POST} api/store', () => {
      it('it should POST an item and receive response with success = 1', (done) => {
        let item = {
          key:   'name',
          value: 'Indiana Jones',
          ttl: 1
        }

        chai.request(server)
          .post(TEST_API)
          .send(item)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.eql({ success: 1, msg: 'Key was added'})
            done()
          })
      })
    })

    // describe(`{DELETE} ${TEST_API}/:key`, () => {
    //   it('it should DELETE a key from store', (done) => {
    //     chai.request(server)
    //       .delete(`${TEST_API}/${PARAM}`)
    //       .end((err, res) => {
    //         res.should.have.status(200)
    //         res.body.should.be.a('object')
    //         res.body.should.eql({ success: 1, msg: 'Key was deleted'})
    //         done()
    //       })
    //   })
    // })

    
    describe(`{GET} ${TEST_API}/:key`, () => {
      it(`it should wait 2000 seconds, and then GET empty object with {success: 0, msg: 'No such key in store'}`, (done) => {

        new Promise((r, j) => setTimeout(r, 2000))
        .then(() => {
          chai.request(server)
              .get(`${TEST_API}/${PARAM}`)
              .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.eql({success: 0, msg: 'No such key in store'})
                done()
              })
        })
        .catch(done)
      
      })
    })
  })

}

