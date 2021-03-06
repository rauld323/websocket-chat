// using the DOM we call in the form
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();

// socketIo calls listens for message and then passes the consoleLog on line 'server.js' line 19
//Messages from servers
socket.on('message', message => {
	console.log(message);
	outputMessage(message);

	//Controls that the scroll in the chat stop when it reaches its height
	chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message was Submitted
chatForm.addEventListener('submit', e => {
	// Prevents the form from becoming a file
	e.preventDefault();

	// msg will collect the value from input(chat- 98) and gets its value
	const msg = e.target.elements.msg.value;

	// Emit message to server
	socket.emit('chatMessage', msg);

	// Makes sure that input is deleted after sent
	e.target.elements.msg.value = '';
	// This creates an autofocus to the input
	e.target.elements.msg.focus() = '';
});

//Output Message to DOM
function outputMessage(message) {
	const div = document.createElement('div');
	div.classList.add('message');
	div.innerHTML = `<p class="meta">
							PlanetConnect
							<span
								>9:15pm</span
							>
						</p>
						<p class="text">
							${message}
						</p>`;
	document.querySelector('.chat-messages').appendChild(div);
}
