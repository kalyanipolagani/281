

var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path');


//URL for the sessions collections in mongoDB
var dbURL = "mongodb://localhost:27017/db_bag";
var mongo = require("./routes/mongo");
var men = require("./routes/men");
var women = require("./routes/women");
var cart = require("./routes/cart");
var checkout = require("./routes/checkout");



var app = express();

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

//GET Requests
app.get('/', routes.index);
app.get('/shoppingcart',cart.shoppingCart);
app.get('/checkout',checkout.checkout);
app.get('/updatedcart',cart.refreshCart);


app.get('/men',men.allMen);
app.get('/menwallet',men.allMenWallet);
app.get('/mencrossbody',men.allMenCrossbody);
app.get('/menbackpack',men.allMenBackpack);

app.get('/women',women.allWomen);
app.get('/womenwallet',women.allWomenWallet);
app.get('/womenhandbag',women.allWomenHandbag);
app.get('/womenclutch',women.allWomenClutch);
app.get('/womencrossbody',women.allWomenCrossbody);
app.get('/womenbackpack',women.allWomenBackpack);



//POST Requests
app.post('/addcart', cart.addCart);
app.post('/updatecart', cart.updateCart);


//connect to the mongo collection session and then createServer
mongo.connect(dbURL, function(){
	console.log('Connected to mongo at: ' + dbURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Server listening on port ' + app.get('port'));
	});  
});