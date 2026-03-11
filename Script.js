
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// *** IMPORTANT ***: Replace this with the actual URL of your deployed Python backend!
// Example: const API_URL = 'https://my-chatbot-backend.herokuapp.com/chat';
const API_URL = 'YOUR_DEPLOYED_PYTHON_BACKEND_URL/chat'; 

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    appendMessage('user', message);
    userInput.value = ''; // Clear input

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });

        const data = await response.json();
        appendMessage('bot', data.response);
    } catch (error) {
        console.error('Error:', error);
        appendMessage('bot', 'Oops! Could not connect to the chatbot backend.');
    }
}

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

appendMessage('bot', 'Hello! I am AnimeBot. Ask me about anime!');
```
