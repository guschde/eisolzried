// Chat
function addMessage(msg) {
    var content = document.createElement('li');
    content.textContent = msg;
    document.getElementById('chat-messages').append(content);
    var box = document.getElementById("chatbox");
    box.scrollTop = box.scrollHeight;
}

function sendMessage() {
    var input = document.getElementById('chat-input');
    var msg = input.value;
    addMessage(msg);
    input.value = '';
    ws.send(msg);
}

var ws = new WebSocket('wss://feuerwehr-eisolzried.de:62187');
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
