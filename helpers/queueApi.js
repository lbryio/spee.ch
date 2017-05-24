// require amqp library
var amqp = require('amqplib/callback_api');

module.exports = {
	addNewTaskToQueue: function(task){
		// connect to RabbitMQ server
		amqp.connect('amqp://localhost', function(err, conn) {
			// create a channel
			conn.createChannel(function(err, ch) {
				var q = 'task_queue2'; // declaring a que is idempotent (it will only be created if it doesnt already exist)
				var msg = task || "request received with no task!";
				// declare a queue
				ch.assertQueue(q, {durable: true});
				// publish a message to the queue
				ch.sendToQueue(q, new Buffer.from(msg), {persistent: true}); 
				console.log(` [x] Sent '${msg}' to ${q}`);
			});
			// close the connection and exit
			setTimeout(function() {conn.close() }, 500);
		});
	}
}