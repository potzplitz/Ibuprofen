var xhr = new XMLHttpRequest();

xhr.open('POST', 'account/checkToken.php', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onload = function () {
  console.log(xhr.responseText);
};

xhr.send();