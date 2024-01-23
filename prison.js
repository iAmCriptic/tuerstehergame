const $ = id => document.getElementById(id)

const audio = $('backgroundMusic');
const scoreEl = $('score')
const healthEl = $('health')
const visitorEl = $('visitor')
const StarsEl = $('stars')
const chatEl = $('chat')
const questionsEl = $('questions')
const acceptBtn = $('accept')
const declineBtn = $('decline')
const bildElement = $("volumelogo");

let score = 0
let health = 3
let stars = 0
let questionCount = 0
let visitorIndex = 0
let currentVisitor
let endlessCount = 0
let starsEarned = [];

/// Liste der Besucher mit Bild und infos über Geduld und Score
const visitors = [
  // Blumenmädchen
  { src: './media/visitors/visitors_prison/01.png', patient: true, desired: true, answers: [ //Desired bestimmt ob die Person rein darf wenn false= nein, true= ja, Patient Bestimmt die anzahl der Fragen false=4 true=6
    "", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "", //
    "", 
    "", 
    "", 
    "", 
    "", 
    "",
    "",
    "",
  ]},
]

const questions = [ //alle fragen, die zu verfügung stehen
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
]

const musicFiles = [ //random auswahl von musik

]

backgroundMusic.src = getRandomMusic();

function createEl(parent, elType, elClass, text) {
  const el = document.createElement(elType)
  el.className = elClass
  el.innerText = text
  parent.append(el)
  return el
}

function setVisitor(visitorIndex) {
  currentVisitor = visitors[visitorIndex]
  visitorEl.src = currentVisitor.src
  chatEl.innerHTML = ""
  resetQuestions()
  askQuestion(0)
}

function nextVisitor() { //Öffnet den nächsten visitor
  questionCount = 0
  visitorIndex++
  if (visitorIndex >= visitors.length) visitorIndex = 0
  setVisitor(visitorIndex)
}

function raiseScore() { //Erhöt den Score 
  score++
  scoreEl.innerText = `${score}`
  saveGameState(); // Speichern nach jeder Änderung des Spielstands
}

function lowerLife() { //verringert das leben oder zeigt den Endscreen an
  if (health === 1){ // no health left
    location.hash = 'game-over'
    resetGameState() //löschte den Spielstand
  } 
  else {
    health--
    healthEl.innerText = '❤️'.repeat(health)
    saveGameState(); // Speichern nach jeder Änderung des Spielstands
    
  }
}

function lowerScore(){
  if(score === 0){
    lowerLife();
  }
  else {
    score --
    scoreEl.innerText = `${score}`
  }
}

function acceptCurrentVisitor() {
  if (currentVisitor.desired) raiseScore()  // Wenn der Aktuelle Besucher reindarf, Erhöhe den Score
  else lowerLife()
  raiseStars()
  nextVisitor()
  raiseEndless()
  openEndlessMenu()
}

function declineCurrentVisitor(){
  if(!currentVisitor.desired) raiseScore()
  else lowerScore()
  raiseStars()
  nextVisitor()
  raiseEndless()
  openEndlessMenu()
}

function askQuestion(questionIndex) {
  const question = questions[questionIndex]
  const answer = currentVisitor.answers[questionIndex]

  const questionBtn = questionsEl.children[questionIndex]
  questionBtn.disabled = true //deaktiviert den Button (Nicht nochmal klickbar)

  updateProgressBar(); 

  questionCount++ //erhöt den Question Count (Relevant wann die Person geht)

  createEl(chatEl, 'div', 'bubble out', question) //funktion zum Erstellen der Chat Bubbles?
  setTimeout(() => {;
    const answerEl = createEl(chatEl, 'div', 'bubble in', '...')
    setTimeout(() => {
      if ((!currentVisitor.patient && questionCount > 4) || questionCount > 6) {
        answerEl.innerText = "Das wird mir hier zu blöd, ich geh woanders hin."  //Antwort bei Zu vielen Fragen
        lowerLife()
        setTimeout(() => nextVisitor(), 2000)
      } else {
        answerEl.innerText = answer
      }
    }, 1000)
  }, 200)
}

function resetQuestions() { //setzt den Questions Counter Zurück
  for (let button of questionsEl.children) {
    button.disabled = false
  }
}

function adjustVolume(value) { //lautstärkeregelung
  audio.volume = value;
  if(audio.volume == 0){
    var neuerBildPfad = "./media/Icons/volume_mute_logo.png";
    bildElement.src = neuerBildPfad;
  }
  else{
    var neuerBildPfad = "./media/Icons/volume_logo.png";
    bildElement.src = neuerBildPfad;
  }
}

function toggleMute() {
  if (audio.volume == 0) {
      adjustVolume(0.5);
      var newPosition = 0.5;
  } else {
      adjustVolume(0);
      var newPosition = 0;
  }
  volumeSlider.value = newPosition;
}

function loadGameState() { //lädt den stand des Games nach öffnen anderer Menüs
  const savedState = localStorage.getItem('gameState');
  if (savedState) {
    const gameState = JSON.parse(savedState);
    score = gameState.score;
    health = gameState.health;
    stars = gameState.stars;
    visitorIndex = gameState.visitorIndex;
    return gameState;
  }
  return null;
}

function saveGameState() { //speichert den Stand daes Games -- Wird durchgeführt nachdem eine Person reingelassen oder Weggeschickt wird
  const gameState = { score, health, visitorIndex, stars, endlessCount };
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

function resetGameState() { //Setzt den Speicher Zurück, beispielsweise nach dem Tod
  score = 0;
  health = 3;
  stars = 0;
  visitorIndex = 0;
  endlessCount = 0;
  healthEl.innerText = '❤️'.repeat(health);
  scoreEl.innerText = `${score}`;
  localStorage.removeItem('gameState');
}

function getRandomMusic() {//wählt zufällige musik aus
  const randomIndex = Math.floor(Math.random() * musicFiles.length);
  return musicFiles[randomIndex];


}

function raiseStars() {
  if (score === 4 || score === 12 || score === 18) {
    // Überprüfen, ob der Score zuvor noch nicht erreicht wurde
    if (!starsEarned.includes(score)) {
      starsEarned.push(score);

      // Überprüfen, ob die maximale Anzahl der Sterne noch nicht erreicht wurde
      if (stars < 3) {
        stars++;
        console.log('Stars' + stars);
        StarsEl.innerText = '⭐'.repeat(stars);
      }
    }
  }
}

function raiseEndless(){
  endlessCount++
  console.log('PersonCount' + endlessCount)
}

function openEndlessMenu(){
  if (endlessCount === 22){
    location.hash = 'endless-selection'
  }
}

function updateProgressBar() {
  const progressBar = $('progress-bar');
  const progressArrow = $('progress-arrow');

  // Anpassung der Fortschrittsleiste basierend auf dem Wert von `patient`
  if (currentVisitor.patient) {
    if (questionCount <= 6) {
      // Berechne den Fortschritt in Prozent für den Patienten
      const progressPercent = Math.max((5 - questionCount) / 5, 0) * 100; // Mindestwert von 0%
      progressArrow.style.top = Math.max(progressPercent, 0) + '%';
    }
  } else {
    if (questionCount <= 4) {
      // Berechne den Fortschritt in Prozent für Nicht-Patienten
      const progressPercent = Math.max((5 - questionCount) / 5, 0) * 100; // Mindestwert von 0%
      progressArrow.style.top = Math.max(progressPercent, 0) + '%';
    }
  }
}

questions.forEach((question, index) => {
  const button = createEl(questionsEl, 'button', 'action', question)
  button.addEventListener('click', () => askQuestion(index))
})

acceptBtn.addEventListener('click', () => acceptCurrentVisitor())
declineBtn.addEventListener('click', () => declineCurrentVisitor())

document.addEventListener('DOMContentLoaded', () => { //überprüft ob Gespeicherter Spielstand verfügbar ist
  const loadedGameState = loadGameState();
  if (loadedGameState) { // Wenn ein gespeicherter Spielstand vorhanden ist, setze den Zustand entsprechend
    score = loadedGameState.score;
    health = loadedGameState.health;
    visitorIndex = loadedGameState.visitorIndex;
    healthEl.innerText = '❤️'.repeat(health)
    StarsEl.innerText = '⭐'.repeat(stars)
    scoreEl.innerText = `${score}`
  }
  setVisitor(visitorIndex);
});

audio.addEventListener('ended', function() {
  console.log('Musik beendet. Starte nächstes Lied...');
  const currentMusic = audio.src;  // Aktuelles Lied
  let nextMusic;

  do {
    nextMusic = getRandomMusic();  // Neues zufälliges Lied
  } while (nextMusic === currentMusic);  // Wiederhole, wenn das neue Lied gleich dem aktuellen ist

  console.log('Next music:', nextMusic);
  audio.src = nextMusic;
  audio.play();  // Starte das nächste Lied
});

document.addEventListener("DOMContentLoaded", function() {
  // Event-Listener für das Label hinzufügen
  var volumeLabel = document.getElementById("volumeLabel");
  volumeLabel.addEventListener("click", toggleMute);
});

document.addEventListener("keydown", function(event) {
  // Überprüfen, ob die gedrückte Taste die "P"-Taste ist (keyCode 80)
  if (event.keyCode === 80) {
    location.hash = 'pause'
  }
});