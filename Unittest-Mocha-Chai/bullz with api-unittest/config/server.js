/*
*  Поднятие сервера
*
*  server.js
*/
const util   = require('util')
const colors = require('colors')

module.exports = function (app) {
  let mode = { name: 'dev',   port: 8000,  color: 'yellow'  } 

  app.listen(mode.port, () => {
    // colorize console message 
    let coloredMsg = []
    for (let key of Object.keys(mode)) {
      coloredMsg.push(colors.bold[mode.color](mode[key]))
    }
    coloredMsg[2] = colors.bold[mode.color]('App')

    util.log(`${coloredMsg[2]} is running on port: ${coloredMsg[1]} (${coloredMsg[0]} mode)`)
  })

  return app
}
