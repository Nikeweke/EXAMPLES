//Require the dev-dependencies
let chai     = require('chai')
let chaiHttp = require('chai-http')
let should   = chai.should()

chai.use(chaiHttp)

module.exports = function (server) {

  describe('API - stack', () => {
  
    describe('{GET} api/stack', () => {
      it('it should GET empty object with success = 0', (done) => {
        chai.request(server)
          .get('/api/stack')
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('success').eql(0)
            done()
          })
      })
    })

    describe('{POST} api/stack', () => {
      it('it should POST an item and receive response with success = 1', (done) => {
        let item = {
          word: 'Hello'
        }

        chai.request(server)
          .post('/api/stack')
          .send(item)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('success').eql(1)
            done()
          })
      })
    })


    describe('{GET} api/stack', () => {
      it('it should GET a word from stack', (done) => {
        chai.request(server)
          .get('/api/stack')
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('string')
            done()
          })
      })
    })

    describe('{GET} api/stack', () => {
      it('it should GET a respone with success = 0', (done) => {
        chai.request(server)
          .get('/api/stack')
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('success').eql(0)
            done()
          })
      })
    })
  })

}

