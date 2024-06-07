var xhr = new XMLHttpRequest();

let response;

xhr.open('POST', 'account/checkToken.php', true);
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
  }
}

function loadUserData(json) {
  document.getElementById("login").innerHTML = json.Username;
}