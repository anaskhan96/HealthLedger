var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var mongodb = require('mongodb');
var mc = mongodb.MongoClient;
var url='mongodb://localhost:27017/test';
mc.connect(url,function(err,db){
	if(!err){
		console.log("Connected!");
	}
	collection=db.collection('sample');
});

app.set('port',5000);

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.get('/ledger',function(request,response){
	response.render("ledger_home.ejs");
});

app.post('/ledger',function(request,response){
	var test=request.body;
	collection.insert({"id":1,"name":test['msg']});
	console.log("Inserted!");
	
});

app.listen(app.get('port'),function(){
	console.log("Node app is running on localhost:",app.get('port'));
});
