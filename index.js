const $ = id => document.getElementById(id)
const scoreEl = $('highscore')

document.addEventListener("keydown", function(event) {
    // Überprüfen, ob die gedrückte Taste die "P"-Taste ist (keyCode 80)
    if (event.keyCode === 65) {
        location.hash = 'anleitung'
    }
    if (event.keyCode ===  87) {
        location.hash = 'welten'
    }
    if (event.keyCode ===  67) {
        location.hash = 'changelog'
    }
    if (event.keyCode === 84 ) {
        location.hash = 'shortcuts'
    }
    if (event.key === "Escape" ) {
        window.history.back();
    }
  });

  function loadGameState() { //lädt den stand des Games nach öffnen anderer Menüs
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      const gameState = JSON.parse(savedState);
      score = gameState.score;
      scoreEl.innerText = `${score}`
    }
    return null;
  }