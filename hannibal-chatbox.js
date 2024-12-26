// Replace with your actual Hannibal API endpoint
const apiEndpoint = 'https://api.hannibal-ai.com/chat';
const authKey = 'YOUR_AUTH_KEY';

// Get the agentName from the script tag's src attribute
const scriptTag = document.currentScript;
const scriptSrc = scriptTag.src;
const urlParams = new URLSearchParams(scriptSrc.split('?')[1]); 
const agentName = urlParams.get('name') || 'Hannibal';

// Create the chat icon
const chatIcon = document.createElement('div');
chatIcon.id = 'hannibal-chat-icon';
chatIcon.innerHTML = `<i class="fa fa-comments" aria-hidden="true"></i>`;
document.body.appendChild(chatIcon);

// Create the chatbox container
const chatboxContainer = document.createElement('div');
chatboxContainer.id = 'hannibal-chatbox-container';
chatboxContainer.innerHTML = `
    <div id="hannibal-chatbox-header">
        <span>${agentName}</span>
        <button id="hannibal-close-button">&times;</button>
    </div>
    <div id="hannibal-conversation"></div>
    <div id="hannibal-chatbox-footer">
        <input type="text" id="hannibal-message-input" placeholder="Type your message..." />
        
    </div>
`;
document.body.appendChild(chatboxContainer);

// CSS styles
const style = document.createElement('style');
style.textContent = `
  /* Chat Icon */
  #hannibal-chat-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background-color: #4CAF50;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 24px;
  }

  /* Chatbox Container */
  #hannibal-chatbox-container {
    display: none;
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 300px;
    height: 400px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    z-index: 1000;
  }

  #hannibal-chatbox-header {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }

  #hannibal-chatbox-header button {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }

  #hannibal-conversation {
    padding: 10px;
    overflow-y: auto;
    height: calc(100% - 90px);
    background-color: #f9f9f9;
  }

  #hannibal-chatbox-footer {
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ddd;
    background-color: #fff;
  }

  #hannibal-message-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 5px;
  }

  #hannibal-send-button {
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    white-space: nowrap;
  }

  #hannibal-message-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 5px;
  }

  #hannibal-send-button {
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  #hannibal-send-button:hover {
    background-color: #45a049;
  }

  /* Messages */
  .user {
    text-align: right;
    margin: 5px 0;
    color: #000;
  }

  .hannibal {
    text-align: left;
    margin: 5px 0;
    color: #4CAF50;
  }
`;
document.head.appendChild(style);

// Event Listeners
chatIcon.addEventListener('click', () => {
    chatboxContainer.style.display = 'block';
    chatIcon.style.display = 'none';
});

// Add event listener for Enter key
document.getElementById('hannibal-message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('hannibal-close-button').addEventListener('click', () => {
    chatboxContainer.style.display = 'none';
    chatIcon.style.display = 'flex';
});

// document.getElementById('hannibal-send-button').addEventListener('click', () => {
function sendMessage() {
    const messageInput = document.getElementById('hannibal-message-input');
    const message = messageInput.value;
    messageInput.value = '';

    if (message.trim() !== '') {
        displayMessage('user', message);

        setTimeout(() => {
            displayMessage('hannibal', `Echo: ${message}`);
        }, 1000);

        // Send the message to the Hannibal API
        // fetch(apiEndpoint, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${authKey}` // Add the authKey to the headers
        //     },
        //     body: JSON.stringify({ message: message })
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         // Display Hannibal's response
        //         displayMessage('hannibal', data.response);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //         displayMessage('hannibal', 'Oops, something went wrong!');
        //     });
    }
}

// Function to display messages
function displayMessage(sender, message) {
    const conversation = document.getElementById('hannibal-conversation');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender);
    messageElement.textContent = sender === 'hannibal' ? `${agentName}: ${message}` : message;
    conversation.appendChild(messageElement);
    conversation.scrollTop = conversation.scrollHeight;
}