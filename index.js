var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // required for AJAX POST
var mongodb = require('mongodb'); // mongodb package for node
var mongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/test';
var mqtt = require('mqtt');

// connecting to the mongo db server
mongoClient.connect(url, function (err, db) {
	if (!err) {
		console.log("Connected!");
	}
	collection = db.collection('sample');
});

let client = mqtt.connect('mqtt://anask.xyz');

client.on('connect', function () {
	client.subscribe('mpca');
	console.log('Publishing...');
	client.publish('mpca', 'Server Connected. ');
});

app.set('port', 5000);

app.use(express.static(__dirname + '/public')); // directory for all css and js
app.use('/favicon.ico', express.static('images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views'); // directory for all ejs files
app.set('view engine', 'ejs'); // using .ejs instead of .html

app.get('/ledger/login', function (req, res) {
	console.log("GET /ledger/login")
	res.render("login.ejs")
});

// GET /ledger
app.get('/ledger', function (request, response) {
	console.log("GET /ledger")
	response.render("ledger_home.ejs");
});

// POST /ledger (called when the button is clicked)
app.post('/ledger', function (request, response) {
	console.log("POST /ledger")
	var test = request.body;
	collection.insert({ "id": 1, "name": test['msg'] });
	console.log("Inserted!");
	collection.find({}).toArray(function (err, docs) {
		console.log("Found the following records");
		// Printing all the documents in the sample in a nested JSON format
		console.dir(docs);
		// Sending back the third JSON document
		response.send(docs[2]);
	});
});

/* MPCA PART (MQTT) */
app.get('/ledger/react-check', function (req, res) {
	var now = new Date();
	console.log("GET /ledger/react-check");
	res.end(now.toString());
});

app.post('/ledger/react-check', function (req, res) {
	console.log('POST /ledger/react-native');
	var data = req.body;
	var msgToSend = "";
	var led = data.led.slice(4);
	var time = data.time;
	msgToSend = "l"+led+"1";
	client.publish('mpca', msgToSend);
	res.send(data);
});

// Listening on 127.0.0.1:5000
app.listen(app.get('port'), function () {
	console.log("Node app is running on localhost:", app.get('port'));
});
