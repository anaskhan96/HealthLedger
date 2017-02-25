var express = require('express');
var app = express();
var bodyParser=require('body-parser');

app.set('port',(process.env.PORT||5000));

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.get('/',function(request,response){
	response.render("Starfield.ejs");
});

app.listen(app.get('port'),function(){
	console.log("Node app is running on localhost:",app.get('port'));
});