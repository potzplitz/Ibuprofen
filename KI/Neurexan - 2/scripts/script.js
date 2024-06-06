let messageCount = 100;

function createNewChat() {
    // Implement the logic to create a new chat
    alert('Create New Chat button clicked');
}

function openLibrary() {
    // Implement the logic to open the library
    alert('Library button clicked');
}

function openDashboard() {
    // Implement the logic to open the dashboard
    alert('Dashboard button clicked');
}

function openPrompt() {
    // Implement the logic to open the chat prompt
    alert('Chat Prompt button clicked');
}

function openAboutUs() {
    // Implement the logic to open the about us section
    alert('About Us button clicked');
}

function changePersonality() {
    const personality = document.getElementById('personality').value;
    alert('Personality changed to: ' + personality);
}

function changeProfessionalism() {
    const professionalism = document.getElementById('professionalism').value;
    alert('Professionalism level: ' + professionalism);
}

function sendMessage() {
    if (messageCount <= 0) {
        showPopup();
        return;
    }

    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    if (message.trim() === '') return;

    const chatBox = document.getElementById('chatBox');
    const newMessage = document.createElement('div');
    newMessage.className = 'message';
    newMessage.textContent = 'You: ' + message;
    chatBox.appendChild(newMessage);

    // Simulate a response from Mr. C
    setTimeout(() => {
        const responseMessage = document.createElement('div');
        responseMessage.className = 'message bot-message';
        responseMessage.textContent = 'Mr. C: Thanks for your message!';
        chatBox.appendChild(responseMessage);
    }, 1000);

    messageInput.value = '';

    messageCount--;
    document.getElementById('messageCount').textContent = 'Messages Left: ' + messageCount;
}

function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('popup');
}   
