var xhr = new XMLHttpRequest();

let response;

let data;

xhr.open('POST', '../account/checkToken.php', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onload = function () {
  response = xhr.responseText;
  checkValid();
};

xhr.send();

function checkValid() {
  if(response != "invalid" || response != undefined) {
    // benutzerdaten laden
    loadUserData(JSON.parse(response));
  
  } else {
    // benutzerdaten werden nicht geladen -> invalid

    document.cookie = "UserAuth" + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

  }
}

let lock = 0;

function loadUserData(json) {
  if(lock == 0) {
 loadChats(json);
  document.getElementById("login").innerHTML = "Guten Tag, " + json.Username;

  data = json;
  lock = 1; 
  }
}

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
  }
}
}

}