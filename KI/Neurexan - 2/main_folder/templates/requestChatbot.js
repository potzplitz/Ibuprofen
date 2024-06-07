function sendMessage() {
  //event.preventDefault();
  const userInput = document.getElementById('userInput');
  const messages = document.getElementById('messages');

  if (userInput.value.trim() === '') {
      return;
  }

  var xhr = new XMLHttpRequest();

  let response;
  const question = userInput;
  const url = `http://127.0.0.1:12345/?question=${encodeURIComponent(question)}`;

  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
  response = xhr.responseText;

  json = JSON.parse(response);

  const botMessageElem = document.createElement('div');
  botMessageElem.classList.add('message');
  botMessageElem.innerHTML = `
  <div class="bot">
      <div class="profile-pic">
          <img src="images/pfp.jpg" width=62 height=62 alt="Profile Picture"><p class="name">Mr. C</p>
      </div>
      <div class="message-content">
          ${json.response}
      </div>
      </div>
  `;
  messages.appendChild(botMessageElem);
  };

xhr.send();


  // Dummy data for demonstration
  const data = {
      user_message: userInput.value,
      bot_response: messages,
      message_count: 49 // Decremented message count for demonstration
  };

  // Add user message
  const userMessageElem = document.createElement('div');
  userMessageElem.classList.add('message');
  userMessageElem.innerHTML = `
  <div class="user">
      <div class="profile-pic">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg" width=62 height=62 alt="Profile Picture"><p class="name">User</p>
      </div>
      <div class="message-content">
          ${userInput.value}
      </div>
      </div>
  `;
  messages.appendChild(userMessageElem);

  // Add bot response
  
  // Scroll to the bottom of the chatbox
  messages.scrollTop = messages.scrollHeight;

  // Clear the input field
  userInput.value = '';

  // Update message count
  const messageCountElem = document.getElementById('messageCount');
  messageCountElem.textContent = data.message_count;

  toggleSettings(); // Close settings after sending message
}

function toggleSettings() {
  const settings = document.getElementById('settings');
  if (settings.classList.contains('expanded')) {
      settings.classList.remove('expanded');
  } else {
      settings.classList.add('expanded');
  }
}

function toggleDropdown() {
  const dropdownMenu = document.getElementById('dropdownMenu');
  dropdownMenu.classList.toggle('open');
}

function showModal() {
  const modal = document.getElementById('messageLimitModal');
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('messageLimitModal');
  modal.style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('messageLimitModal');
  if (event.target == modal) {
      modal.style.display = 'none';
  }
}

function customFunction1() {
  alert('Option 1 selected');
}

function customFunction2() {
  alert('Option 2 selected');
}

function customFunction3() {
  alert('Option 3 selected');
}

function customFunction4() {
  alert('Option 4 selected');
}

function customFunction5() {
  alert('Option 5 selected');
}