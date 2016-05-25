var Client = require('node-rest-client').Client;
var http = require('http') ;
var count = "";
var endpoint1 = "http://ELB-Exam-1541338455.us-west-2.elb.amazonaws.com/cmpe281/app";

exports.get = function(req, res) {
	var json_responses;
console.log("here")
	 var client = new Client();
	  
	            client.get( endpoint1, function(data, response_raw){
	            	if(response_raw) {
	            		console.log("in");
	            			console.log(data);                  
	                    res.render('values', { data : data });
	            	}  	else {
	    				console.log("returned false");
	  
	            	}
	            	 });
	
	
};
