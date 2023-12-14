function getCookie(name) {
  var cookieName = name + "=";
  var cookies = document.cookie.split(';');
  for(var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
}

var hscore = getCookie("highscore");

window.onload = function() {
    document.getElementById('h-hscore').innerText = hscore;
}