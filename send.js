const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (err, connection)=> {
    if(err)
    throw err;
    connection.createChannel((err, channel)=> {

        if(err)
        throw err;
        const queue = "logs"
        const message = 'I am testing Rabbit message queueing system'
        channel.assertQueue(queue, {
            durable: true
        })
        

        channel.sendToQueue(queue, Buffer.from(message))
        console.log(`queue test sent to ${queue}`)
    })
})