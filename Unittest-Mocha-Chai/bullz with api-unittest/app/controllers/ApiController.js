/** @module ApiController */

const NodeTtl = require('node-ttl')

module.exports = {

  stack: [],
  store: new NodeTtl(),

  /**
  * @api {GET}  /api/stack  getFromStack()
  * @apiDescription         Get word from a stack
  * @apiGroup               ApiController
  */
  getFromStack (req, res) {
    let item   = this.stack.pop()
    let result = item || { success: 0, msg: 'No item left' }  
    return res.json(result)
  },

  /**
  * @api {GET} /api/stack   addToStack()
  * @apiDescription         Add to stack a word
  * @apiGroup               ApiController
  */
  addToStack (req, res) {
    let { word } = req.body
    this.stack.push(word)
    return res.json({ success: 1, msg: 'Word was added'})
  },  

  /**
  * @api {POST} /api/stack   addKeyToStore()
  * @apiDescription          Add to stack a word
  * @apiGroup                ApiController
  */
  addKeyToStore (req, res) {
    let {key, value, ttl} = req.body
    ttl = ttl ? Number(ttl) : 0
    this.store.push(key, value, null, ttl)
    return res.json({ success: 1, msg: 'Key was added'}) 
  },

  /**
  * @api {GET} /api/store/:key   getValueByKey()
  * @apiDescription              Add to stack a word
  * @apiGroup                    ApiController
  */
  getValueByKey (req, res) {
    let { key } = req.params
    if (!this.store.get(key)) {
      return res.json({success: 0, msg: 'No such key in store'})
    }

    return res.json({ success: 1,  value: this.store.get(key) })
  },

  /**
  * @api {DELETE} /api/store/:key   deleteValueByKey()
  * @apiDescription                 Delete key from store by key
  * @apiGroup                       ApiController
  */
  deleteValueByKey (req, res) {
    let { key } = req.params
    let result = this.store.del(key)

    if (result) {
      return res.json({ success: 1, msg: 'Key was deleted'})     
    } else {
      return res.json({ success: 0, msg: 'Something went wrong'})
    }
  },


 

}
