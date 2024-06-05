function submit() {

    let username = document.getElementById("usernameinput").value;
    let email = document.getElementById("emailinput").value;
    let password = document.getElementById("passwordinput").value;
    let confirm = document.getElementById("confirminput").value;

    if(password == confirm) {
        makeRequest(username, email, password);
    } else {
        // feedback auf website
    }
    
}

function makeRequest(username, email, password) {
var xhr = new XMLHttpRequest();

xhr.open('POST', 'addAccount.php', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onload = function () {
  if (xhr.status === 200) {
    console.log('Antwort:', xhr.responseText);
  } else {
    console.error('Fehler beim Server-Request:', xhr.statusText);
  }
};

var params = 'username=' + encodeURIComponent(username) +
               '&email=' + encodeURIComponent(email) +
               '&password=' + encodeURIComponent(password);

xhr.send(params);

}
