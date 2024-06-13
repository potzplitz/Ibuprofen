// This event listener waits for the entire HTML document to load before executing the function.
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the slider element by its ID.
    const knowledgeSlider = document.getElementById('professionalismRange');
  
    // Add an event listener to the slider for 'input' events.
    knowledgeSlider.addEventListener('input', function() {
        updateKnowledgeLevel(this.value);  // Call the function to update the knowledge level display.
        console.log(this.value);  // Log the current value of the slider.
    });
  
    // Function to update knowledge level display (optional)
    function updateKnowledgeLevel(value) {
        let knowledge;
        // Determine the knowledge level based on the slider value.
        switch (value) {
            case '1':
                knowledge = 'low';
                break;
            case '2':
                knowledge = 'below_average';
                break;
            case '3':
                knowledge = 'average';
                break;
            case '4':
                knowledge = 'above_average';
                break;
            case '5':
                knowledge = 'high';
                break;
        }
        // Log the selected knowledge level.
        console.log("Selected knowledge level:", value, "->", knowledge);
        // Optional: Update a display element if needed.
        // document.getElementById('knowledgeDisplay').textContent = knowledge;
    }
  });
  
  // Set the default selection for the tutor.
  let tutorSelection = 'code';  // Default selection
  
  // Initialize a counter.
  let counter = 0;
  
  // Function to handle sending messages.
  function sendMessage() {
    const userInput = document.getElementById('userInput');  // Get user input element.
    const messages = document.getElementById('messages');  // Get the messages container element.
    const knowledgeSlider = document.getElementById('professionalismRange');  // Get the slider element.
  
    // If the input is empty, return without doing anything.
    if (userInput.value.trim() === '') {
        return;
    }
  
    let question = userInput.value;  // Get the user question.
    let knowledgeValue = knowledgeSlider.value;  // Get the slider value.
    let knowledge;
  
    // Determine the knowledge level based on the slider value.
    switch (knowledgeValue) {
        case '1':
            knowledge = 'low';
            break;
        case '2':
            knowledge = 'below_average';
            break;
        case '3':
            knowledge = 'average';
            break;
        case '4':
            knowledge = 'above_average';
            break;
        case '5':
            knowledge = 'high';
            break;
    }
  
    // Create and add the user message to the DOM.
    const userMessageElem = document.createElement('div');
    userMessageElem.classList.add('message');
    userMessageElem.innerHTML = `
    <div class="user">
        <div class="profile-pic">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg" width=62 height=62 alt="Profile Picture"><p class="name">` + data.Username + `</p>
        </div>
        <div class="message-content">
            ${userInput.value}
        </div>
    </div>
    `;
    messages.appendChild(userMessageElem);
  
    counter++;  // Increment counter for bot response ID.
  
    // Create and add a bot message placeholder to the DOM.
    const botMessageElem = document.createElement('div');
    botMessageElem.classList.add('message');
    botMessageElem.innerHTML = `
    <div class="bot">
        <div class="profile-pic">
            <img src="images/pfp.jpg" width=62 height=62 alt="Profile Picture"><p class="name">Mr. C</p>
        </div>
        <div class="message-content">
            <p id="response${counter}">Thinking...</p>
        </div>
    </div>
    `;
    messages.appendChild(botMessageElem);
  
    // Construct the URL for the request.
    const url = `http://127.0.0.1:12345/?question=${encodeURIComponent(question)}&knowledge=${encodeURIComponent(knowledge)}&role=${encodeURIComponent(tutorSelection)}`;
  
    // Create a new XMLHttpRequest object.
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);  // Open a GET request.
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');  // Set the request header.
    xhr.onload = function () {
        // If the request is successful, process the response.
        if (xhr.status === 200) {
            const response = xhr.responseText;  // Get the response text.
            const json = JSON.parse(response);  // Parse the JSON response.
            let responseLabel = document.getElementById(`response${counter}`);  // Get the corresponding response element.
            if (responseLabel) {
                responseLabel.innerHTML = json.response;  // Set the bot response.
  
               // Optionally save user data here.
               // saveUserData(userInput.value, json.response);
            } else {
                console.error(`Element with id response${counter} not found.`);
            }
        } else {
            console.error(`Request failed with status ${xhr.status}`);  // Log error if request fails.
        }
    };
  
    // Handle request error.
    xhr.onerror = function () {
        console.error("Request failed.");
    };
  
    xhr.send();  // Send the request.
  
    // Scroll to the bottom of the messages container.
    messages.scrollTop = messages.scrollHeight;
  
    // Clear the input field.
    userInput.value = '';
  
    // Update the message count.
    const messageCountElem = document.getElementById('messageCount');
    messageCountElem.textContent = parseInt(messageCountElem.textContent) - 1;
  
    // Close settings after sending a message.
    toggleSettings();
  }
  
  // Function to toggle the settings display.
  function toggleSettings() {
    const settings = document.getElementById('settings');
    if (settings.classList.contains('expanded')) {
        settings.classList.remove('expanded');
    } else {
        settings.classList.add('expanded');
    }
  }
  
  // Initialize a toggle variable for dropdown menu.
  let toggle = 0;
  
  // Function to toggle the dropdown menu.
  function toggleDropdown() {
    let dropdownMenu = document.getElementById('dropdownMenu');
    if (toggle === 0) {
        toggle = 1;
        dropdownMenu.style.visibility = "visible";
    } else {
        toggle = 0;
        dropdownMenu.style.visibility = "hidden";
    }
  }
  
  // Function to show a modal dialog.
  function showModal() {
    const modal = document.getElementById('messageLimitModal');
    modal.style.display = 'block';
  }
  
  // Function to close the modal dialog.
  function closeModal() {
    const modal = document.getElementById('messageLimitModal');
    modal.style.display = 'none';
  }
  
  // Close the modal when clicking outside of it.
  window.onclick = function(event) {
    const modal = document.getElementById('messageLimitModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
  }
  
  // Functions to set the tutor selection.
  function customFunction1() {
    tutorSelection = 'math';
  }
  
  function customFunction2() {
    tutorSelection = 'code';
  }
  
  function customFunction3() {
    tutorSelection = 'translate';
  }
  
  // Function to delete a specific cookie.
  function deleteCookie() {
      document.cookie = "UserAuth" + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  }
  
  // Function to save user data.
  function saveUserData(userData, botData) {
      json = JSON.parse(decodeURIComponent(getCookie("UserAuth")));  // Parse user auth cookie.
      var xhr = new XMLHttpRequest();
      let response;
  
      xhr.open('POST', '../account/getUserDataWithSessionToken.php', true);  // Open a POST request.
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');  // Set the request header.
      xhr.onload = function () {
          response = xhr.responseText;  // Get the response text.
          checkValid();  // Call validation function.
      };
  
      xhr.send("token=" + json.token);  // Send the request with the token.
  }
  
  // Save user data initially with placeholder values.
  saveUserData(1, 1);
  
  // Placeholder function to load user data.
  function loadUser() {}
  
  // Function to get a specific cookie by name.
  function getCookie(name) {
      let cookies = document.cookie;  // Get all cookies.
      let nameEQ = name + "=";  // Construct the cookie name string.
  
      let cookieArray = cookies.split(';');  // Split cookies into an array.
  
      for (let i = 0; i < cookieArray.length; i++) {
          let cookie = cookieArray[i].trim();  // Trim whitespace.
          if (cookie.indexOf(nameEQ) == 0) {
              return cookie.substring(nameEQ.length, cookie.length);  // Return the cookie value if found.
          }
      }
      return null;  // Return null if cookie not found.
  }


    function redirectToHomepage() {
    window.location.href = 'index.html'; // Replace with the actual URL of the homepage
}

function redirectToChatbot() {
    window.location.href = 'chatbot.html'; // Replace with the actual URL of the chatbot page
}

function openLibrary() {
    alert('Library button clicked');
}

function openDashboard() {
    alert('Dashboard button clicked');
}

function openAboutUs() {
    alert('About Us button clicked');
}

function openContacts() {
    window.location.href = 'contacts.html'; // Replace with the actual URL of the contacts page
}

  
