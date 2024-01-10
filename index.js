// Beispielvariablen
var loadedGameState = loadGameState();
var score = 0;
var health = 3; 
var visitorIndex = 0;
var scoreEl = document.getElementById('score'); // Stelle sicher, dass du das korrekte Element auswählst

if (loadedGameState) {
    // Wenn ein gespeicherter Spielstand vorhanden ist, setze den Zustand entsprechend
    score = loadedGameState.score;
    scoreEl.innerText = `${score}`;
}

// Highscore-Logik
var gespeicherterHighscore = localStorage.getItem('highscore');

if (gespeicherterHighscore !== null) {
    var highscore = parseInt(gespeicherterHighscore);

    // Annahme: Neue Punktzahl
    var neuePunktzahl = 1;

    if (neuePunktzahl > highscore) {
        highscore = neuePunktzahl;
        console.log('Neuer Highscore erstellt: ' + highscore);

        // Speichere den neuen Highscore im Local Storage
        localStorage.setItem('highscore', highscore);
    }
} else {
    // Wenn noch kein Highscore gespeichert ist, setze den aktuellen Score als Highscore
    localStorage.setItem('highscore', score);
}

// Aktualisiere die Anzeige des Highscores, falls notwendig
var aktuellerHighscore = localStorage.getItem('highscore');
console.log('Aktueller Highscore: ' + aktuellerHighscore);
document.getElementById('highscore').innerHTML = highscore