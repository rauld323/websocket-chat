const path = require('path');
// Express is called
const express = require('express');
// HTTP module is called from createImageBitmap.http
const http = require('http');
// SocketIo package is called
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set Static Folder from public folder
app.use(express.static(path.join(__dirname, 'public')));
// socket will listen for a connection call and use arrow function io
io.on('connection', socket => {
	console.log('New Connection has been made...');

	// Socket 'emit' shares the message to the person that connects
	socket.emit('message', 'Greetings from PlanetConnect');

	// Shows a message to everone EXCEPT the user that states who has connects
	socket.broadcast.emit('message', 'A being has entered the chat');

	// Shows a message when someone leaves the chat room
	socket.on('disconnect', () => {
		io.emit('message', 'A being has left...');
	});
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
