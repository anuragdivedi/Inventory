var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

//app.use(bodyParser.urlencoded({ extended:false}));
//app.use(bodyParser.json());

app.get('/', function(req,res) {
	res.sendFile(__dirname + "/frontend.html");
});

app.get('/booklist', function(req,res) {
	var db = mysql.createConnection( {
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'inventory'
	});
	db.connect(function(err) {  
		if (err) throw err;
		db.query("SELECT * from mini", function(err, data) {
			if(err) throw err;
			console.log(data);
			res.send(data);
			db.end();
		})  
		console.log("Connected!");  
	  });  
})

/*app.post('/view', function(req,res){
	var db = mysql.createConnection( {
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'inventory'
	});
	db.connect(()=>{
	  db.query('SELECT * FROM mini', function(err,data){     
		if(err){
		  res.send("Error encountered while displaying");
		  return console.error(err.message);
		}
		res.send(data);
		console.log("Entry displayed successfully");
	  });
	});
  }); */

	
app.listen(3000, function() {
	console.log("Server started");
})