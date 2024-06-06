const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

let value = params.get("create");
let loginval = params.get("login");

console.log(value);

if(value == "success") {
    document.getElementById("accountsuccess").style.visibility = "visible";
}

if(loginval == "success") {
    document.getElementById("infotext").innerHTML = "Erfolgreich angemeldet!";
    document.getElementById("detail").innerHTML = "Ihre Chats werden nun automatisch gespeichert.";
    document.getElementById("accountsuccess").style.visibility = "visible";
}


    