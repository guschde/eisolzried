// Chat
const chatbox = query('.chatbox')[0];
function addMessage(msg) {
    let content = document.createElement('li');
    content.textContent = msg;
    document.getElementById('chat-messages').append(content);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function sendMessage() {
    let input = document.getElementById('chat-input');
    let msg = input.value;
    addMessage(msg);
    input.value = '';
    ws.send(msg);
}

const ws = new WebSocket('wss://feuerwehr-eisolzried.de:62187');
ws.onmessage = function(msg) {
    addMessage(msg.data);
};

document.getElementById('chat-btn').onclick = function() {
    sendMessage();
};

document.getElementById('chat-form').onkeypress = function(event) {
    if (event.keyCode == 13) {
        sendMessage();
        event.preventDefault();
    }
};
