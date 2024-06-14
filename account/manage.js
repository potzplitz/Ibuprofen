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

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);

    oldPasswordInput.value = "";
    newPasswordInput.value = "";
}

let jsondata;

function loadAccount(json) {
    console.log(json);
    document.getElementById("email").value = json.Email;
    document.getElementById("username").value = json.Username;

    const profileImage = document.getElementById('profileImage');
    const span = document.querySelector('.profile-picture span');

    profileImage.style.display = 'block';
    profileImage.src = json.LinkToPicture;
    span.style.display = 'none';

    jsondata = json;
    
}

 function submitChanges() {


    if(document.getElementById("oldPassword").value == jsondata.Passwort) {
        
    }
    uploadImage();
}

function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'modifyAccount.php', true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('Bild erfolgreich hochgeladen:', xhr.responseText);
                const profileImage = document.getElementById('profileImage');
                profileImage.src = URL.createObjectURL(file);
                profileImage.style.display = 'block';
            } else {
                console.error('Fehler beim Hochladen des Bildes:', xhr.status, xhr.statusText);
            }
        };

        xhr.send(formData);
    } else {
        console.error('Keine Datei ausgewählt.');
    }
}
