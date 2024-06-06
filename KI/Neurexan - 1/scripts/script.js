
let messageCount = 50;

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const messages = document.getElementById('messages');
    const messageCountElem = document.getElementById('messageCount');

    if (userInput.value.trim() === '') {
        return;
    }

    // Create a new message element
    const messageElem = document.createElement('div');
    messageElem.classList.add('message');
    messageElem.innerHTML = `
        <div class="profile-pic">
            <img src="profile-pic-url" alt="Profile Picture">
        </div>
        <div class="message-content">
            
            ${userInput.value}
        </div>
    `;
    messages.appendChild(messageElem);

    // Clear the input field
    userInput.value = '';

    // Update message count
    messageCount--;
    messageCountElem.textContent = messageCount;

    if(messageCount <= 0) {
        document.getElementById
    }
  
}