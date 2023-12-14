// Auf der anderen Seite, um den Highscore anzuzeigen
window.onload = function() {
    // Lese den Highscore aus dem Cookie
    const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)highscore\s*=\s*([^;]*).*$)|^.*$/, "$1");
    
    // Überprüfe, ob ein Highscore-Cookie vorhanden ist
    if (cookieValue) {
      document.getElementById('h-score').innerText = cookieValue;
    }
    if (highscore) {
        document.getElementById('highscoreOnOtherPage').innerText = highscore;
      }
  }