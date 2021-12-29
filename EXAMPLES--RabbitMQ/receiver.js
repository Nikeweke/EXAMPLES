const amqp = require('amqplib/callback_api');
const cfg = require('./config')

const RMQ_URL = cfg.url
const RMQ_QUEUE = cfg.queue
const RMQ_OPTS = cfg.options

amqp.connect(RMQ_URL, function (error0, connection) {
  console.log('Receiver connected to: ' + RMQ_URL)

  if (error0) {
    return console.log(error0)
  }

  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertQueue(RMQ_QUEUE, RMQ_OPTS);

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", RMQ_QUEUE);


    channel.consume(RMQ_QUEUE, function (msg) {
      console.log(" [x] Received %s", msg.content.toString());
    });


  });
});
