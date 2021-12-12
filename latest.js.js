var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "CHELYABINSK91Enriched"


app.get('/', function(req,res) {
	res.sendFile(__dirname + "/latest.html");
});

 

 app.get('/booklist', function(req,res){
  oracledb.getConnection(
    {
      user: "inf10_cfg_sqlts", 
      password: mypw,
      connectString: "eipdb10dev.am.lilly.com:1533/dev_68"
    }, 
    function(err, connection) {
      if (err) {error = err; return;}
     
      connection.execute('select DOMAIN_NAME,HOST_NAME,OWNER_NAME,GW_PORT,DOMAIN_DB_ACCOUNT,CUSTODIAN_NAME,PRIMARY_CONTACT,COST_CENTER,VALUE from ENV_TABLE', [], function(err, result) {
        if (err) {error = err; return;}
        error = null;
        console.log(result);
        res.send(result);
 
        connection.close(function(err) {
          if (err) {console.log(err);}
        });
      })
    }
  );

 });

 app.get('/IOD', function(req,res){
  oracledb.getConnection(
    {
      user: "inf10_cfg_sqlts", 
      password: mypw,
      connectString: "eipdb10dev.am.lilly.com:1533/dev_68"
    }, 
    function(err, connection) {
      if (err) {error = err; return;}
     
      connection.execute('select ORGANIZATION_NAME from IOD_TABLE', [], function(err, result) {
        if (err) {error = err; return;}
        error = null;
        console.log(result);
        res.send(result);
 
        connection.close(function(err) {
          if (err) {console.log(err);}
        });
      })
    }
  );

 });

 app.get('/MDM', function(req,res){
  oracledb.getConnection(
    {
      user: "inf10_cfg_sqlts", 
      password: mypw,
      connectString: "eipdb10dev.am.lilly.com:1533/dev_68"
    }, 
    function(err, connection) {
      if (err) {error = err; return;}
     
      connection.execute('select ENV,HOSTNAME from MDM_TABLE', [], function(err, result) {
        if (err) {error = err; return;}
        error = null;
        console.log(result);
        res.send(result);
 
        connection.close(function(err) {
          if (err) {console.log(err);}
        });
      })
    }
  );

 });


	
app.listen(3000, function() {
	console.log("Server started");
})
