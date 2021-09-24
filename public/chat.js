const socket = io('http://localhost:3000');

// DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', () => {
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    })

    console.log({
        username: username.value,
        message: message.value
    });
});

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value);
});

socket.on('server:chat:message', (data) => {
    actions.innerHTML = '';
    message.value = '';
    output.innerHTML += '<p><strong>' + data.username + ': ' + data.message +  '</strong></p>';
});

socket.on('server:chat:typing', (data) => {
    actions.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
});