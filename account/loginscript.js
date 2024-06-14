function submit() {
    let email = document.getElementById("emailinput").value;
    let password = document.getElementById("passwordinput").value;

    if(password != "" && email != "") {
        makeRequest(email, password);
    } else {
        let errorBox = document.getElementById("errorDiv");
        errorBox.style.visibility="visible";
    }
}


function makeRequest(email, password) {

    let errorBox = document.getElementById("errorDiv");

    var xhr = new XMLHttpRequest();
    
    xhr.open('POST', 'getLoginData.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
      if (xhr.status === 200) {

        console.log(xhr.responseText);

        if(xhr.responseText != "notFound") {

            if(xhr.responseText == 1) {
                window.location.href = "../index.html?login=success";
            } else {
                errorBox.style.visibility="visible";
                // passwort nicht korrekt
            }

             
        } else {
            
            errorBox.style.visibility="visible";

            // account existiert nicht
        }

      } else {
        console.error('Fehler beim Server-Request:', xhr.statusText);
      }
    };
    
    var params = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password);
                   
    xhr.send(params);
    
    }