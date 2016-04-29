var cart = [];
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/db_bag";
var coll;
var json_responses;
var output = [];
var shoppingcartmain = [];
var allowtoproceed = [];

mongo.connect(mongoURL, function() {
	console.log('Connected to mongo at: ' + mongoURL);
	coll = mongo.collection('bags');

	coll.find({}, {
		image : 1,
		item_code : 1,
		type : 1,
		color : 1,
		gender : 1,
		price : 1,
		style : 1,
		avail_count : 1,
		_id : 0
	}).toArray(function(err, data) {
		if (data) {
			json_responses = {
				"data" : data
			};

		} else {
			console.log("No data found")

		}
	});
});

exports.addCart = function(req, res) {

	item_code = req.param("item_code");

	console.log("item select is :" + item_code);

	cart.push(item_code);

	output = cart.reduce(function(a, b) {
		if (a.indexOf(b) < 0)
			a.push(b);
		return a;
	}, []);

	cart = output;
	console.log("items in cart")
	console.log(cart)

	console.log("output of output");
	console.log(output);

} // end of addCart

exports.shoppingCart = function(req, res) {

	var price = 0;
	var tot_quantity = 0;
	var shoppingcart = [];
	var allow='1';

	for (p in output) {
		for (i in json_responses.data) {
			if (json_responses.data[i].item_code == cart[p]) {
				shoppingcart.push(json_responses.data[i]);
			}
		}
	}

	for (a in shoppingcart) {
		if (shoppingcart[a].quantity >= 1) {

		} else {
			shoppingcart[a]['quantity'] = '1';
		}

	}

	for (i in shoppingcart) {
		var a = Number(shoppingcart[i].price);
		var b = Number(shoppingcart[i].quantity);
		var c = a * b;

		price = Number(price) + Number(c);
		console.log("price");
		console.log(price);
	}

	for (i in shoppingcart) {
		tot_quantity = Number(tot_quantity) + Number(shoppingcart[i].quantity);
	}

	shoppingcartmain = shoppingcart;

	console.log("content for cart");
	console.log(shoppingcart);

	console.log("content for cart");
	console.log(shoppingcart);

	for (i in shoppingcart) {
		for (j in json_responses) {
			if (Number(json_responses.data[i].avail_count) < Number(shoppingcart[i].quantity)) {
				allowtoproceed[i] = '0';
				console.log("in if for loop")
				console.log("value of allow to proceed is : " + allowtoproceed);
			} else {
				allowtoproceed[i] = '1';
				console.log("value of allow to proceed in else : "
						+ allowtoproceed);
			}

		}
	}

	console.log("allow to proceed array in refresh");
	console.log(allowtoproceed);
	
	
	for(var i=0;i<allowtoproceed.length;i++)
	{
		if(allowtoproceed[i]=='0')
			allow = '0';
	}
	console.log("value of allow final ")
	console.log(allow);	
	
	res.render('shoppingcart', {
		values : shoppingcart,
		price : price,
		quantity : tot_quantity,
		proceed : allow
	});

}

// updateCart
exports.updateCart = function(req, res) {

	var price = 0;
	var tot_quantity = 0;
	var shoppingcart = [];

	shoppingcart = shoppingcartmain;

	item_code = req.param("item_code");
	quantity = req.param("quantity");
	console.log("Item code to be update is : " + item_code);
	console.log("Quantity is : " + quantity);

	for (p in shoppingcart) {
		if (shoppingcart[p].item_code == item_code) {
			shoppingcart[p].quantity = quantity;
		}
	}

	for (i in shoppingcart) {
		var a = Number(shoppingcart[i].price);
		var b = Number(shoppingcart[i].quantity);
		var c = a * b;

		price = Number(price) + Number(c);
		console.log("price in updated");
		console.log(price);
	}

	for (i in shoppingcart) {
		tot_quantity = Number(tot_quantity) + Number(shoppingcart[i].quantity);
	}

	shoppingcartmain = shoppingcart;

}

//refresh 
exports.refreshCart = function(req, res) {
	var price = 0;
	var tot_quantity = 0;
	var shoppingcart = [];
	var allow='1';

	shoppingcart = shoppingcartmain;

	for (i in shoppingcart) {
		var a = Number(shoppingcart[i].price);
		var b = Number(shoppingcart[i].quantity);
		var c = a * b;

		price = Number(price) + Number(c);
		console.log("price in updated");
		console.log(price);
	}

	for (i in shoppingcart) {
		tot_quantity = Number(tot_quantity) + Number(shoppingcart[i].quantity);
	}

	for (i in shoppingcart) {
		for (j in json_responses) {
			if (Number(json_responses.data[i].avail_count) < Number(shoppingcart[i].quantity)) {
				allowtoproceed[i] = '0';
				console.log("in if for loop")
				console.log("value of allow to proceed is : " + allowtoproceed);
			} else {
				allowtoproceed[i] = '1';
				console.log("value of allow to proceed in else : "
						+ allowtoproceed);
			}

		}
	}

	console.log("allow to proceed array in refresh");
	console.log(allowtoproceed);
	
	
	for(var i=0;i<allowtoproceed.length;i++)
	{
		if(allowtoproceed[i]=='0')
			allow = '0';
	}
	console.log("value of allow final ")
	console.log(allow);
	
	

	//here
	res.render('shoppingcart', {
		values : shoppingcart,
		price : price,
		quantity : tot_quantity,
		proceed : allow
	});

}
