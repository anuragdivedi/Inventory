var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var oracledb = require('oracledb');

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "CHELYABINSK91Enriched"  // set mypw to the hr schema password


app.get('/', function(req,res) {
	res.sendFile(__dirname + "/latest.html");
});

oracledb.getConnection(
  {
    user: "inf10_cfg_sqlts", 
    password: mypw,
    connectString: "eipdb10dev.am.lilly.com:1533/dev_68"
  }, 
  function(err, connection) {
    if (err) {error = err; return;}
    
    connection.execute('select DOMAIN_NAME from ENV_TABLE', [], function(err, result) {
      if (err) {error = err; return;}

      //user = result.rows[0][0];
      error = null;
      console.log(result);
      connection.close(function(err) {
        if (err) {console.log(err);}
      });
    })
  }
);



app.get('/booklist', function(req,res){
  oracledb.getConnection(
    {
      user: "inf10_cfg_sqlts", 
      password: mypw,
      connectString: "eipdb10dev.am.lilly.com:1533/dev_68"
    }, 
    function(err, connection) {
      if (err) {error = err; return;}
      
      connection.execute('select DOMAIN_NAME from ENV_TABLE', [], function(err, result) {
        if (err) {error = err; return;}
  
        //user = result.rows[0][0];
        error = null;
        res.send(result);
      
        console.log(result);
        connection.close(function(err) {
          if (err) {console.log(err);}
        });
      })
    }
  );
	/*var db = mysql.createConnection( {
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'inventory'
		
	});
	db.connect(function(err) {  
		if (err) throw err;  
		console.log("Connected!"); 
		db.query("SELECT * from mini", function(err, data) {
			if(err) throw err;
			res.send(data);
			db.end();
		}) 
	  }); */
})
	
	

	


/*app.get('/userbooks', function(req,res) {
	var db = mysql.createConnection( {
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'inventory'
	});
	db.connect();


	db.query("SELECT * from dummy", function(err, data) {
		if(err) throw err;
		res.send(data);
		db.end();
	}) 
}) */

	
app.listen(3000, function() {
	console.log("Server started");
})
