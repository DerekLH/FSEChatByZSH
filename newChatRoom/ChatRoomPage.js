var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'fse'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

var history = new Array();


/* GET home page. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM Message', function(err, result, fields){
	var len = result.length ;
	//console.log(len);
	var i = 0;
	//console.log(result);
	for(i=0;i<len;++i)
	{
		history[i] = result[i].content;
		//history = history +"'" +result[i].content+"'" +',';
	}
	//history = history + "'" + result[len-1].content + "']";
	//console.log(history);
});
  res.render('ChatRoomPage',{his:history});
});

module.exports = router;
