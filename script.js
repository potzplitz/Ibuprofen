const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

let value = params.get("create");
let loginval = params.get("login");

if(value == "success") {
    document.getElementById("accountsuccess").style.visibility = "visible";

    setTimeout(function() {
        document.getElementById("accountsuccess").style.visibility = "hidden";
    }, 5000);
}

if(loginval == "success") {
    document.getElementById("infotext").innerHTML = "Erfolgreich angemeldet!";
    document.getElementById("detail").innerHTML = "Ihre Änderungen werden nun gespeichert.";
    document.getElementById("accountsuccess").style.visibility = "visible";

    setTimeout(function() {
        document.getElementById("accountsuccess").style.visibility = "hidden";
    }, 5000);

}




    