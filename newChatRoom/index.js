var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');


// view engine setup
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

var ChatRoomPage = require('./ChatRoomPage');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.use('/ChatRoomPage',ChatRoomPage);

http.listen(5000, function(){
  console.log('listening on 5000');
});
//app.get('/ChatRoomPage', function(req, res){
//  res.sendFile(__dirname + '/ChatRoomPage.html');
//});
// DB Schema:
// create table Message(content varchar(1000));
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

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('a user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    var insertSQL = 'INSERT INTO Message(content) VALUES(?)';
    connection.query(insertSQL,msg,function(err,result){
    	if(err)
    	{
    		console.log('INSERT ERR',err.message);
    		return;
    	}
    	io.emit('chat message',msg);

    });
  });
});

