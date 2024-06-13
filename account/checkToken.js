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
    
  document.getElementById("login").innerHTML = "Guten Tag, " + json.Username;
  //loadAccount(json);
  console.log("test");

  try{
    
    loadChats(json)

  } catch(err) {
    console.log("loadChats() nicht definiert");
  }

  data = json;
  lock = 1; 
  }
}

