function submit() {
    let email = document.getElementById("emailinput").value;
    let password = document.getElementById("passwordinput").value;

    if(password != "" && email != "") {
        makeRequest(email, password);
        window.location.href = "../index.html?login=success";
    } else {
        let errorBox = document.getElementById("errorDiv");
        errorBox.style.visibility="visible";
    }
}


function makeRequest(email, password) {
    var xhr = new XMLHttpRequest();
    
    xhr.open('POST', 'getLoginData.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Antwort:', xhr.responseText);
      } else {
        console.error('Fehler beim Server-Request:', xhr.statusText);
      }
    };
    
    var params =
                   '&email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password);
    
    xhr.send(params);
    
    }