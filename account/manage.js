function loadFile(event) {
    const profileImage = document.getElementById('profileImage');
    const span = document.querySelector('.profile-picture span');
    profileImage.src = URL.createObjectURL(event.target.files[0]);
    profileImage.onload = () => {
        URL.revokeObjectURL(profileImage.src);
        profileImage.style.display = 'block';
        span.style.display = 'none';
    };
}

function changeEmail() {
    const emailInput = document.getElementById('email');
    if (emailInput.disabled) {
        emailInput.disabled = false;
        emailInput.focus();
    } else {
        emailInput.disabled = true;
    }
}

function changePassword() {
    const oldPasswordInput = document.getElementById('oldPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    
    const oldPassword = oldPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const username = usernameInput.value;
    const email = emailInput.value;

    // Here you can use AJAX or form submission to send this data to your PHP script
    // For demonstration purposes, let's just log the data
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);

    // Reset the input fields
    oldPasswordInput.value = "";
    newPasswordInput.value = "";
}

let jsondata;

function loadAccount(json) {
    console.log(json);
    document.getElementById("email").value = json.Email;
    document.getElementById("username").value = json.Username;

    jsondata = json;
    
}

 function submitChanges() {


    var xhr = new XMLHttpRequest();

    let response;

xhr.open('POST', '../account/checkToken.php', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onload = function () {
  response = xhr.responseText;
console.log(response);
};


    if(document.getElementById("oldPassword").value == jsondata.Passwort) {
        // modify php data
    }




}