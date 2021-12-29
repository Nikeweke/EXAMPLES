const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const app = express()

app.get('/', (req, res) => res.send('online'))

app.post('/dialogflow', express.json(), (request, response) => {
  const agent = new WebhookClient({ request, response})

  // console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  // console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  console.log(request.body)

  function welcome () {
    console.log('I am here dude')
    agent.add('Welcome to my agent!')
  }

  let intentMap = new Map()
  intentMap.set('Default Welcome Intent', welcome) // Default Welcome Intent - это название Intent'a
  agent.handleRequest(intentMap)
}) 

app.listen(process.env.PORT || 8080, () => console.log('Webhook is running...'))
