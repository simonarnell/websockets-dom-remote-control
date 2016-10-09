var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/public'));
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var flexboxManager= io.of('/flexbox').on('connection', function(socket) {
  console.log('A new browser connected to the flexbox channel')
  
  socket.on('1stContainer', function(message) {
	console.log('Received iframe message');
    console.log('Broadcasting iframe message to other listeners');
    flexboxManager.emit('1stContainer', message);
  });
  socket.on('2ndContainer', function(message) {
	console.log('Received iframe message');
    console.log('Broadcasting iframe message to other listeners');
    flexboxManager.emit('2ndContainer', message);
  });
});

server.listen(8080);