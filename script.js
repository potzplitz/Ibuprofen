const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

let value = params.get("create");

console.log(value);

if(value == "success") {
    document.getElementById("accountsuccess").style.visibility = "visible";
}


    