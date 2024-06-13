userChats = [];
botChats = [];

document.addEventListener('DOMContentLoaded', function() {
  const knowledgeSlider = document.getElementById('professionalismRange');

  // Add event listener to the slider
  knowledgeSlider.addEventListener('input', function() {
      updateKnowledgeLevel(this.value);
      console.log(this.value);
  });




  // Function to update knowledge level display (optional)
  function updateKnowledgeLevel(value) {
      let knowledge;
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
      console.log("Selected knowledge level:", value, "->", knowledge);
      // You can also update a display element if needed
      // document.getElementById('knowledgeDisplay').textContent = knowledge;
  }
});

let tutorSelection = 'code';  // Default selection

let counter = 0;

function sendMessage() {
  const userInput = document.getElementById('userInput');
  const messages = document.getElementById('messages');
  const knowledgeSlider = document.getElementById('professionalismRange');

  if (userInput.value.trim() === '') {
      return;
  }

  let question = userInput.value;
  let knowledgeValue = knowledgeSlider.value;
  let knowledge;

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

  counter++;

  // Add user message
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

  userChats[counter] = userInput.value;

  messages.appendChild(userMessageElem);

   // Increment counter before using it in the DOM

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

  const url = `http://localhost:12345/?question=${encodeURIComponent(question + "The Context of the previous conversation: user chat: " + userChats + ", previous bot chat: " + botChats)}&knowledge=${encodeURIComponent(knowledge)}&role=${encodeURIComponent(tutorSelection)}`;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
      if (xhr.status === 200) {
          const response = xhr.responseText;
          const json = JSON.parse(response);
          let responseLabel = document.getElementById(`response${counter}`);
          if (responseLabel) {
              responseLabel.innerHTML = json.response;
              
              botChats[counter] = json.response;

              saveUserData();
          } else {
              console.error(`Element with id response${counter} not found.`);
          }
      } else {
          console.error(`Request failed with status ${xhr.status}`);
      }
  };

  xhr.onerror = function () {
      console.error("Request failed.");
  };

  xhr.send();

  // Scroll to the bottom of the chatbox
  messages.scrollTop = messages.scrollHeight;

  // Clear the input field
  userInput.value = '';

  // Update message count
  const messageCountElem = document.getElementById('messageCount');
  messageCountElem.textContent = parseInt(messageCountElem.textContent) - 1;

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

let toggle = 0;

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
  if (event.target === modal) {
      modal.style.display = 'none';
  }
}

function customFunction1() {
  tutorSelection = 'math';
}

function customFunction2() {
  tutorSelection = 'code';
}

function customFunction3() {
  tutorSelection = 'translate';
}

function deleteCookie() {
    document.cookie = "UserAuth" + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

function saveUserData() {
    let json = JSON.parse(decodeURIComponent(getCookie("UserAuth")));

    
    let jsonData = {
        "user": userChats.filter(element => element !== null),
        "bot": botChats.filter(element => element !== null)
    };

    jsonstring = JSON.stringify(jsonData);
    console.log(jsonstring);

    var xhr = new XMLHttpRequest();
    let response;

    xhr.open('POST', 'saveChats.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        response = xhr.responseText;
        checkValid();
    };

    xhr.send("token=" + json.token + "&data=" + jsonstring);
}

    function getCookie(name) {

        let cookies = document.cookie;
        
        let nameEQ = name + "=";

        let cookieArray = cookies.split(';');

        for(let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(nameEQ) == 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
       return null;
    }

    let lock1 = 0;


    function loadChats(jsonData) {

        if(jsonData.ChatData != "") {
          const messages = document.getElementById('messages');
          chatJson = JSON.parse(jsonData.ChatData);
          console.log(chatJson);
      
        for(let i = 0; i < chatJson.user.length; i++) {
          if(chatJson.user[i] != null) {
      
        const userMessageElem = document.createElement('div');
        userMessageElem.classList.add('message');
        userMessageElem.innerHTML = `
        <div class="user">
            <div class="profile-pic">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg" width=62 height=62 alt="Profile Picture"><p class="name">` + jsonData.Username + `</p>
            </div>
            <div class="message-content">
                ${chatJson.user[i]}
            </div>
        </div>
        `;
        messages.appendChild(userMessageElem);
      
        const botMessageElem = document.createElement('div');
        botMessageElem.classList.add('message');
        botMessageElem.innerHTML = `
        <div class="bot">
            <div class="profile-pic">
                <img src="images/pfp.jpg" width=62 height=62 alt="Profile Picture"><p class="name">Mr. C</p>
            </div>
            <div class="message-content">
                <p id="response${counter}">` + chatJson.bot[i] + `</p>
            </div>
        </div>
        `;
        messages.appendChild(botMessageElem);

        userChats[i] = chatJson.user[i];
        botChats[i] = chatJson.bot[i];
        counter = i;
        }

        

        

        console.log("join: " + userChats);
      }
      }
      
      }