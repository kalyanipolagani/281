var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/db_bag";
var coll;
var json_responses;

mongo.connect(mongoURL, function() {
	console.log('Connected to mongo at: ' + mongoURL);
	coll = mongo.collection('bags');

	coll.find({
		gender : "women"
	}, {
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

exports.allWomen = function(req, res) {

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		coll = mongo.collection('bags');

		coll.find({
			gender : "women"
		}, {
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
				// console.log(data);
				// console.log(json_responses.data);
				res.render("men", {
					values : data
				});

			} else {
				console.log("No data found")

			}
		});
	});
}

exports.allWomenWallet = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
		if (json_responses.data[i].type === "wallet") {
			output.push(json_responses.data[i]);
		}
	}

	res.render("women", {
		values : output
	})

}

exports.allWomenHandbag = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
		if (json_responses.data[i].type === "handbag") {
			output.push(json_responses.data[i]);
		}
	}

	res.render("women", {
		values : output
	})

}

exports.allWomenClutch = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
		if (json_responses.data[i].type === "clutch") {
			output.push(json_responses.data[i]);
		}
	}

	res.render("women", {
		values : output
	})

}

exports.allWomenCrossbody = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
		if (json_responses.data[i].type === "crossbody") {
			output.push(json_responses.data[i]);
		}
	}

	res.render("women", {
		values : output
	})

}

exports.allWomenBackpack = function(req, res) {

	var output = [];

	for (i in json_responses.data) {
		if (json_responses.data[i].type === "backpack") {
			output.push(json_responses.data[i]);
		}
	}

	res.render("women", {
		values : output
	})

}
