const amqp = require('amqplib/callback_api');
const cfg = require('./config')

const RMQ_URL = cfg.url
const RMQ_QUEUE = cfg.queue
const RMQ_OPTS = cfg.options

amqp.connect(RMQ_URL, (err, connection) => {
  console.log('Writer connected to: ' + RMQ_URL)
 
  if (err) {
    console.log('Error occured')
    return console.log(err)
  }

  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }

    const msg = {
      "type":"registration",
      "date":"2020-02-28",
      "refcode":"83ecfa94-1131-4f94-a328-4a40377a3024",
      "subid":"",
      "clickid":"",
      "referer":"",
      "user_id":3252,
      "user_ip":"95.67.44.226"
    };

    channel.assertQueue(RMQ_QUEUE, RMQ_OPTS);
    channel.sendToQueue(RMQ_QUEUE, Buffer.from(JSON.stringify(msg)));

    console.log(" [x] Sent %s", msg);
  });


});
