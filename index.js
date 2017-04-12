var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // required for AJAX POST
var mongodb = require('mongodb'); // mongodb package for node
var mongoClient = mongodb.MongoClient;
//uncomment before commit
var url = 'mongodb://dbms:shaata420@anask.xyz:27017/HealthLedger';
//var url = 'mongodb://localhost:27017/HealthLedger';
var mqtt = require('mqtt');
var schedule = require('node-schedule');

let db = null;

let obj = null;
let medHist = null;
let allergies = null;
let reports = null;
let insurancePolicy = null;
let hospitalDetails = null;

// The horrors I have to go through
let patientObj = null;
let patientMedHist = null;
let patientAllergies = null;
let patientReports = null;
let patientInsurancePolicy = null;
let patientHospitalDetails = null;
let patientJson = { 'obj': null, 'medHist': null, 'allergies': null, 'insurancePolicy': null, 'hospitalDetails': null };

// connecting to the mongo db server
mongoClient.connect(url, function (err, database) {
	if (!err) {
		console.log("Connected!");
	}
	db = database;
});

let client = mqtt.connect('mqtt://anask.xyz');

client.on('connect', function () {
	client.subscribe('mpca');
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
	res.render("index.ejs");
});

app.post('/ledger/login', function (req, res) {
	console.log('POST /ledger/login');
	var ID = req.body.ID;
	var type = req.body.user;
	var cursor = null;
	var cursorMedHist = null; // medhist, treatment, and doctor details
	var cursorAllergies = null;
	var cursorInsurancePolicy = null;
	var cursorHospital = null;
	if (type == "doctor") {
		cursor = db.collection('doctors').find({ "ID": ID });
		cursor.each(function (err, doc) {
			if (doc != null) {
				obj = { 'ID': ID, 'name': doc.Name, 'dob': doc.DOB }
				res.redirect('/ledger/doctor');
			}
		});
	}
	else {
		cursor = db.collection('patients').find({ "_id": ID });
		cursorMedHist = db.collection('treatment').find({ "Patient_id": ID });
		cursorAllergies = db.collection('allergen').find({ "_id": ID });
		cursorInsurancePolicy = db.collection('insurance').find({ "Patient_id": ID });
		cursorHospital = db.collection('hospitals').find({ "_id": ID.slice(0, 4) });
		cursorMedHist.each(function (err, doc) {
			if (doc != null) {
				medHist = { 'disease': doc.Treat_for, 'prescribed': doc.Prescription, 'prescribedBy': doc.Doctor_id };
			}
		});
		cursorAllergies.each(function (err, doc) {
			if (doc != null) {
				allergies = { 'allergy': doc.Allergy };
			}
		});
		cursorHospital.each(function (err, doc) {
			if (doc != null) {
				hospitalDetails = { 'id': doc._id, 'location': doc.Location };
			}
		});
		if (hospitalDetails == null) {
			hospitalDetails = { 'id': 'H000', 'location': 'Florida' };
		}
		cursorInsurancePolicy.each(function (err, doc) {
			if (doc != null) {
				insurancePolicy = { 'insurancePolicy': doc._id, 'premium': doc.Premium, 'coverage': doc.Coverage };
			}
		});
		cursor.each(function (err, doc) {
			if (doc != null) {
				console.log(doc.Name);
				obj = { 'ID': ID, 'name': doc.Name, 'dob': doc.DOB };
				res.redirect('/ledger');
			}
		});
	}
});

// GET /ledger
app.get('/ledger', function (request, response) {
	console.log("GET /ledger")
	if (obj != null) {
		response.render("profile.ejs", { 'obj': obj, 'medHist': medHist, 'allergies': allergies, 'insurancePolicy': insurancePolicy, 'hospitalDetails': hospitalDetails });
	}
	else
		response.send('not happening');
});

// GET /ledger/doctor
app.get('/ledger/doctor', function (req, res) {
	console.log("GET /ledger/doctor");
	if (obj != null)
		res.render("doctor_profile.ejs", { 'obj': obj });
	else
		res.send('not happening');
});

// POST /ledger/doctor
app.post('/ledger/doctor', function (req, res) {
	var patientID = req.body.patientID;
	var cursor = db.collection('patients').find({ "_id": patientID });
	var cursorMedHist = db.collection('treatment').find({ "Patient_id": patientID });
	var cursorAllergies = db.collection('allergen').find({ "_id": patientID });
	var cursorInsurancePolicy = db.collection('insurance').find({ "Patient_id": patientID });
	var cursorHospital = db.collection('hospitals').find({ "_id": patientID.slice(0, 4) });
	cursorMedHist.each(function (err, doc) {
		if (doc != null) {
			patientMedHist = { 'disease': doc.Treat_for, 'prescribed': doc.Prescription, 'prescribedBy': doc.Doctor_id };
			patientJson['medHist'] = patientMedHist;
		}
	});
	cursorAllergies.each(function (err, doc) {
		if (doc != null) {
			patientAllergies = { 'allergy': doc.Allergy };
			patientJson['allergies'] = patientAllergies;
		}
	});
	cursorHospital.each(function (err, doc) {
		if (doc != null) {
			patientHospitalDetails = { 'id': doc._id, 'location': doc.Location };
			patientJson['hospitalDetails'] = patientHospitalDetails;
		}
	});
	if (patientHospitalDetails == null) {
		patientHospitalDetails = { 'id': 'H000', 'location': 'Florida' };
	}
	cursorInsurancePolicy.each(function (err, doc) {
		if (doc != null) {
			patientInsurancePolicy = { 'insurancePolicy': doc._id, 'premium': doc.Premium, 'coverage': doc.Coverage };
			patientJson['insurancePolicy'] = patientInsurancePolicy;
		}
	});
	cursor.each(function (err, doc) {
		if (doc != null) {
			patientObj = { 'ID': patientID, 'name': doc.Name, 'dob': doc.DOB };
			patientJson['obj'] = patientObj;
			res.send(patientJson);
		}
	});
});

// GET /ledger (called when switch button is clicked)
app.get('/ledger/switch', function (req, res) {
	console.log("GET /ledger/switch");
	res.render("switch.ejs");
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
	console.log("GET /ledger/react-check");
	res.end("Checking stuff...");
});

app.post('/ledger/react-check', function (req, res) {
	console.log('POST /ledger/react-native');
	var data = req.body;
	var msgToSend = "";
	var led = data.led.slice(4);
	var time = data.time;
	var hour = parseInt(time.slice(0, 1));
	if (time.slice(2) == "PM")
		hour = hour + 12;
	msgToSend = "l" + led + "1";
	// Scheduling according to GMT +0000
	var j = schedule.scheduleJob({ hour: hour - 6, minute: 30 }, function () {
		console.log("Scheduler called");
		client.publish('mpca', msgToSend);
		console.log("Published at the scheduled time");
	});
	var confirmation = "Message Sent to MQTT";
	res.send({ "confirm": confirmation });
});

app.post('/ledger/now', function(req, res) {
	var led = req.body.led.slice(4);
	msg = "l" + led + "1";
	client.publish('mpca', msg);
	res.send({ 'confirm': 'Message Sent Now' });
});

// Listening on 127.0.0.1:5000
app.listen(app.get('port'), function () {
	console.log("Node app is running on localhost:", app.get('port'));
});
