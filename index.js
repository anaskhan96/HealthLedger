var express = require('express');
var app = express();
var bodyParser=require('body-parser'); // required for AJAX POST
var mongodb = require('mongodb'); // mongodb package for node
var mc = mongodb.MongoClient;
var url='mongodb://localhost:27017/test';

// connecting to the mongo db server
mc.connect(url,function(err,db){
	if(!err){
		console.log("Connected!");
	}
	collection=db.collection('sample');
});

app.set('port',5000);

app.use(express.static(__dirname+'/public')); // directory for all css and js
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('views',__dirname+'/views'); // directory for all ejs files
app.set('view engine','ejs'); // using .ejs instead of .html

// GET /ledger
app.get('/ledger',function(request,response){
	response.render("ledger_home.ejs");
});

// POST /ledger (called when the button is clicked
app.post('/ledger',function(request,response){
	var test=request.body;
	collection.insert({"id":1,"name":test['msg']});
	console.log("Inserted!");
	collection.find({}).toArray(function(err, docs) {
    	console.log("Found the following records");
    	// Printing all the documents in the sample in a nested JSON format
    	console.dir(docs);
    	// Sending back the third JSON document
    	response.send(docs[2]);
  	});
});

// Listening on 127.0.0.1:5000
app.listen(app.get('port'),function(){
	console.log("Node app is running on localhost:",app.get('port'));
});
