var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/db_bag";
var coll;
var json_responses;

mongo.connect(mongoURL, function() {
	console.log('Connected to mongo at: ' + mongoURL);
	coll = mongo.collection('bags');

	coll.find({
		gender : "men"
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

exports.index = function(req, res) {
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
				// console.log(data);
				// console.log(json_responses.data);
				res.render("index", {
					values : data
				});

			} else {
				console.log("No data found")

			}
		});
	});

	//  res.render('index', { title: 'Welcome to Bag Store' });
};