const amqp = require('amqplib/callback_api')


amqp.connect('amqp://localhost',(error, connection)=> {
    if(error)
    console.log('error is connecting rabbitMq')
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        } 
        let queue = 'task_queue';
        let msg = process.argv.slice(2).join(' ') || "Hello World!";
        
        channel.assertQueue(queue, {
          durable: true
        });
        channel.sendToQueue(queue, Buffer.from(msg), {
          persistent: true
        });
        console.log(" [x] Sent '%s'", msg);
        setTimeout(function() {
            connection.close();
            process.exit(0)
          }, 500);
 


})
})