 const amqp = require('amqplib/callback_api')

 amqp.connect("amqp:localhost", function(err, connection) {
      if (err)
      throw err;
      connection.createChannel((error, channel)=> {
          if(error)
          console.log('error', error.message)
      
     let xChange = 'logs'
    let msg = process.argv.slice(2).join(' ') || 'Hello World!';
     channel.assertExchange(xChange , 'fanout', {durable: false})//it just broadcasts all the messages it 
                                                                     //receives to all the queues it knows. 
                                                                    //And that's exactly what we need for our logger.

     channel.publish(xChange , '', Buffer.from(msg));// publish to our named exchange 
     //The empty string as second parameter means that we don't want to send the message to any specific queue. 
     //We want only to publish it to our 'logs' exchange.

     channel.assertQueue('', {
          exclusive: true
        }); //empty strings means that RabbitMq will generate a default queue name for the consumer and will close
        // the queue when the connection closes

     channel.bindQueue(queue_name, xChange , '');//From now on the logs exchange will append messages to our queue.
      console.log(" [x] Sent %s", msg)  
      
      setTimeout(function() { 
          connection.close(); 
          process.exit(0); 
        }, 500);
})
 })