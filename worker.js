// load dependencies
var amqp = require('amqplib/callback_api');
// load helpers
var lbryApi = require('./helpers/lbryApi');
// open a connection and a channel
amqp.connect('amqp://localhost', function(err, conn) {
	// open a channel
	conn.createChannel(function(err, ch) {
		var q = 'task_queue2';
		// declare the cue (in case the publisher hasn't made it yet)
		ch.assertQueue(q, {durable: true});
		// tell the queue to only assign one task at a time to this worker
		ch.prefetch(1);
		// listen for messages & pass callback for what to do with the msgs
		console.log(" [x] Waiting for messages in %s.  To exit press ctrl+c", q);
		ch.consume(q, function(msg) {
			var task = JSON.parse(msg.content.toString());
			console.log(` [o] Received a ${task.type} task`);
			// initiate the task
			switch(task.type) {
				case 'publish':
					console.log(" [-] publishing:", task.data);
					lbryApi.publishClaim(task.data);
					break;
				default:
					console.log(" [-] that task type is not recognized");
					console.log(" [x] Done");
			}
		}, {noAck: true});
	});
});