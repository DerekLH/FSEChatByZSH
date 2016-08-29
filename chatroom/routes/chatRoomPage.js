//var express = require('express');
//var router = express.Router();

/* GET home page. */
//router.get('/ChatRoomPage', function(req, res, next) {
//  res.render('ChatRoomPage');
//});
//module.exports = router;

module.exports = function(io)
{
	var express = require('express');
	var router = express.Router();
	io.on('connection', function(socket){
    console.log('a user connected');
    });
	router.get('/ChatRoomPage', function(req, res, next) {
    res.render('ChatRoomPage');
    });
	return router;
}