/**
 * http://usejsdoc.org/
 */
//exports.women = function(req, res){
//  res.render('women', { title: 'Guess Bags' });
//};

var Client = require('node-rest-client').Client;
var http = require('http') ;
var count = "";
var endpoint = "http://team1ELB-153492086.us-east-1.elb.amazonaws.com/catalog?gender=women" ;


exports.women = function(req, res){

    var client = new Client();
  //  var datf = "error";
            client.get( endpoint, function(data, response_raw){
            	if(response_raw) {
  
            		//console.log(response_raw);
            		console.log(data[0].item_code) ;
                    console.log(data[0].type) ;
                    console.log(data[0].gender) ;
                    console.log(data[0].color) ;
                    console.log(data[0].style) ;
                    console.log(data[0].price) ;
                    console.log(data[0].avail_count) ;
                    
                    count = data[0].countGumballs
                    console.log( "count = " + count ) ;
                    //res.end( "count = " + count + "\n");
                    
                    res.render('women', { data: data });
            	} 
            	
            	else {
    				console.log("returned false");
  //  				res.render('/womenerr');
            	}
            	 });
}


