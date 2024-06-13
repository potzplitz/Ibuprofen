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

// Function to send a message
function sendMessage() {
    const userInput = document.getElementById('userInput');  // Get the user input element
    const messages = document.getElementById('messages');  // Get the messages container element
    const messageCountElem = document.getElementById('message');  // Get the message count element
}

// Necessary functions for the Homepage

// Function to redirect to the chatbot page
function redirectToChatbot() {
    window.location.href = 'chat/index.html';  // Replace with the actual URL of the chatbot page
}

// Function to handle the library button click
function openLibrary() {
    alert('Library button clicked');  // Display an alert message
}

// Function to handle the dashboard button click
function openDashboard() {
    alert('Dashboard button clicked');  // Display an alert message
}

// Function to handle the About Us button click
function openAboutUs() {
    alert('About Us button clicked');  // Display an alert message
}



    