function submit() {

    let username = document.getElementById("usernameinput").value;
    let email = document.getElementById("emailinput").value;
    let password = document.getElementById("passwordinput").value;
    let confirm = document.getElementById("confirminput").value;

    if(password == confirm && password != "" && confirm != "" && username != "" && email != "") {
        makeRequest(username, email, password);
        
    } else {
        let errorBox = document.getElementById("errorDiv");
        errorBox.style.visibility="visible";
    }
    
}

function makeRequest(username, email, password) {
var xhr = new XMLHttpRequest();

xhr.open('POST', 'addAccount.php', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onload = function () {

console.log(xhr.status);

  if (xhr.status === 200) {
    console.log('Antwort:', xhr.responseText);
    window.location.href = "../index.html?create=success";
  } else {
    console.error('Fehler beim Server-Request:', xhr.statusText);
  }
};

console.log(username + email + password);

var params = 'username=' + encodeURIComponent(username) +
               '&email=' + encodeURIComponent(email) +
               '&password=' + encodeURIComponent(password);

xhr.send(params);

}

