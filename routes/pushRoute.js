var https = require('https');
var push = require('pushover-notifications');

exports.testPush = function(req, res){
	var apiKey = req.body.key;
	console.log("Test Push Request Recieved! API KEY: " + apiKey);

	// jsonObject = JSON.stringify({
	//     "token" : 'a1JXKFCZK2ezYK52QcVjmFm4h4Qtco',
	//     "user" : apiKey,
	//     "title" : "Write To Remember",
	//     "message" : "Write something write now!",
	//     "url" : 'http://writetoremember.herokuapp.com/home'
	// });

	// var postheaders = {
 //    	'Content-Type' : 'application/json',
 //    	'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
	// };

	// var options = {
	// 	headers: postheaders,
	// 	hostname: 'api.pushover.net',
	// 	path: '/1/messages.json',	
	// 	method: 'POST'
	// };

	// var pushRequest = https.request(options, function(pushResponse){
	// 	console.log("sending push request: ", options);
	// 	console.log("statusCode: ", pushResponse.statusCode);
	// 	console.log("headers: ", pushResponse.headers);
		

	// 	pushResponse.on('data', function(d){
	// 		console.info('POST result:\n');
 //        	process.stdout.write(d);
 //        	console.info('\n\nPOST completed');
	// 	});
	// });

	// //pushRequest.write(jsonObject);
	// pushRequest.end();

	// pushRequest.on('error', function(e){
	// 	console.error(e);
	// });
	
	var p = new push({
		user: apiKey,
		token: 'a1JXKFCZK2ezYK52QcVjmFm4h4Qtco'
	});

	var msg = {
		message: 'Write something write now! http://writetoremember.herokuapp.com/home',
		title: "Write to Remember",
	};

	try{
		p.send(msg, function(err, result){
			if(err){
				console.error(err);
			}

			console.log(result);
			var response = new Object();
		    response.status = "success";
		    res.json(response);
		});
	}catch(err){
		console.error(err);
	}
	

};