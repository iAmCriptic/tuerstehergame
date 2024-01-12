const $ = id => document.getElementById(id)

const scoreEl = $('score')
const healthEl = $('health')
const visitorEl = $('visitor')
const chatEl = $('chat')
const questionsEl = $('questions')
const acceptBtn = $('accept')
const declineBtn = $('decline')

let score = 0
let health = 3
let questionCount = 0
let visitorIndex = 0
let currentVisitor

var audio = document.getElementById("gAudio");

/// Liste der Besucher mit Bild und infos über Geduld und Score
const visitors = [
  // Drug Dealer
  { src: './media/visitors/01.png', patient: false, desired: false, answers: [ //Desired bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt, Patient Bestimmt die anzahl der Fragen false=4 true=6
    "Wenns sein muss...", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "23", // Alter
    "Wieso willst du das wissen?", // Habseligkeiten
    "Hier hat man Privatsphäre.", // Clubwissen
    "Warum gehst du denn in Clubs?", // Besuchsgrund
    "Ging mir schon schlechter.", // Gesundheit
    "Ständig.", // wiederholter Besuch
    "Ich bin selbstständig.", // Beruf
  ]},
  // Footballer
  { src: './media/visitors/02.png', patient: true, desired: true, answers: [
    "Klar, schieß los!", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "Ich bin 26.", // Alter
    "Nichts besonderes, hier schau selbst...", // Habseligkeiten
    "Wurde mir empfohlen.", // Clubwissen
    "Party mit Freunden.", // Besuchsgrund
    "Ich bin kerngesund.", // Gesundheit
    "Ein paar mal.", // wiederholter Besuch
    "Ich bin Sportler.", // Beruf
  ]},
  // Dog Owner
  { src: './media/visitors/03.png', patient: true, desired: false, answers: [
    "Was willst'n wissen?", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "42 Jahre jung.", // Alter
    "Nichts besonderes, hier schau selbst...", // Habseligkeiten
    "Wurde mir empfohlen.", // Clubwissen
    "Party mit Freunden.", // Besuchsgrund
    "Mir geht's gut.", // Gesundheit
    "Nein noch nicht.", // wiederholter Besuch
    "Ich arbeite bei der Bank.", // Beruf
  ]},
  // Homeless
  { src: './media/visitors/04.png', patient: false, desired: false, answers: [
    "Hmm...", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "38", // Alter
    "Was denkst du denn hmm...?", // Habseligkeiten
    "Die lange Schlange vor der Tür spricht dafür, dass es hier gut ist.", // Clubwissen
    "Ablenkung.", // Besuchsgrund
    "Ich habe vielleicht Corona.", // Gesundheit
    "Ja vor einigen Jahren.", // wiederholter Besuch
    "Früher war ich auch Abenteurer, aber dann habe ich einen Pfeil ins Knie bekommen.", // Beruf
  ]},
  // Business Woman
  { src: './media/visitors/05.png', patient: true, desired: true, answers: [
    "Du weißt wohl nicht wer ich bin. Aber gut wenn's sein muss.", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "42", // Alter
    "Meine Geldbörse, mein Handy und eine Pistole... Nur ein Scherz, hahahaha.", // Habseligkeiten
    "Wurde mir empfohlen.", // Clubwissen
    "Ich treffe mich hier mit Kollegen.", // Besuchsgrund
    "Mir gehts prima.", // Gesundheit
    "Natürlich.", // wiederholter Besuch
    "Ich leite erfolgreich ein mittelständiges Unternehmen.", // Beruf
  ]},
    // Old Man
    { src: './media/visitors/06.png', patient: true, desired: true, answers: [
      "Erzähl mal Jungchen.", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "62 Jahre.", // Alter
      "Mein Handy und mein Geld aber sonst nichts.", // Habseligkeiten
      "Noch nicht viel... Deshalb bin ich hier.", // Clubwissen
      "Mein Sohn geht hier oft hin und ich wollte mir das mal ansehen.", // Besuchsgrund
      "Vor zwei Jahren habe ich mir den Fuß gebrochen und seit dem tut der weh.", // Gesundheit
      "Ich war noch nie hier.", // wiederholter Besuch
      "Ich bin Professor.", // Beruf
    ]},
    // Cool guy
    { src: './media/visitors/07.png', patient: true, desired: true, answers: [
      "Hau raus!", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "32 Jahre.", // Alter
      "Meinen Autoschlüssel und mein Geld.", // Habseligkeiten
      "Entspannter Club zum Spaß haben.", // Clubwissen
      "Ich brauche Ablenkung vom Alltag.", // Besuchsgrund
      "Alles super.", // Gesundheit
      "Das siebte mal mitlerweile. Also jap.", // wiederholter Besuch
      "Ich bin Autoverkäufer.", // Beruf
    ]},
      // Cowgirl
    { src: './media/visitors/08.png', patient: false, desired: false, answers: [
      "Junge... Los, beeile dich!", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "22", // Alter
      "Nichts besonderes.", // Habseligkeiten
      "Halt Club.", // Clubwissen
      "Ein bissl was kaufen, wenn du verstehst.", // Besuchsgrund
      "Ich bin auf Entzug.", // Gesundheit
      "Nö.", // wiederholter Besuch
      "Ich verkaufe hin und wieder so Zeug.", // Beruf
    ]},
      // Cowboy
    { src: './media/visitors/09.png', patient: false, desired: false, answers: [
      "Nagut, aber mach schnell!", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "42 Jahre alt und mitten im Leben.", // Alter
      "Nen Revolver.", // Habseligkeiten
      "Kein Plan.", // Clubwissen
      "Ja Feiern halt.", // Besuchsgrund
      "Ganz gut.", // Gesundheit
      "Ja war schonmal hier gewesen.", // wiederholter Besuch
      "Scharfschütze.", // Beruf
    ]},
      // Vorlage
    { src: './media/visitors/10.png', patient: false, desired: true, answers: [
      "Mein Gott, dann los.", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "Ich bin vor 2 Wochen 22 Geworden.", // Alter
      "Nix.", // Habseligkeiten
      "Joa soll ganz cool sein.", // Clubwissen
      "Ich will mich entspannen.", // Besuchsgrund
      "Alles gut.", // Gesundheit
      "Jap.", // wiederholter Besuch
      "Ich bin aktuell arbeitslos.", // Beruf
    ]},
        // Vorlage
    { src: './media/visitors/11.png', patient: true, desired: true, answers: [
      "Aber schnell bitte.", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "33 Jahre jung und immer noch neugierig auf das Leben.", // Alter
      "Meinen Anzug.", // Habseligkeiten
      "Nicht viel.", // Clubwissen
      "Ich will feiern.", // Besuchsgrund
      "Mir geht's gut.", // Gesundheit
      "Nope.", // wiederholter Besuch
      "Nach was sieht's wohl aus.", // Beruf
    ]},
        // Vorlage
    { src: './media/visitors/12.png', patient: false, desired: true, answers: [
      "Na dann hop.", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "Ich bin 29 Jahre alt und genieße meine letzten Zwanziger.", // Alter
      "Schlüssel und Handy.", // Habseligkeiten
      "Angeblich soll er sehr gut sein.", // Clubwissen
      "Feiern...", // Besuchsgrund
      "Bin gesund.", // Gesundheit
      "Ja.", // wiederholter Besuch
      "Business Manager.", // Beruf
    ]},
        // Vorlage
    { src: './media/visitors/13.png', patient: true, desired: false, answers: [
      "Hmm...", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "Google doch.", // Alter
      "...", // Habseligkeiten
      "...", // Clubwissen
      "Geht dich nichts an.", // Besuchsgrund
      "Hat dich nicht zu interessieren.", // Gesundheit
      "...", // wiederholter Besuch
      "...", // Beruf
    ]},
        // Vorlage
    { src: './media/visitors/14.png', patient: true, desired: false, answers: [
      "Jaa okee.", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "Heehehe 18...?", // Alter
      "Äh nix.", // Habseligkeiten
      "Is toll.", // Clubwissen
      "Ich will Spaß haben.", // Besuchsgrund
      "Mir gehts gut.", // Gesundheit
      "Neee ist mein erstes Mal.", // wiederholter Besuch
      "Gerade bin ich arbeitslos.", // Beruf
    ]},
    // Vorlage
    { src: './media/visitors/15.png', patient: true, desired: false, answers: [
      "Muss das sein?", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "Ich bin stolze 23! ", // Alter
      "Nur mein Telefon und Portemonnaie.", // Habseligkeiten
      "Nichts hab aber ein Werbe Poster gesehen.", // Clubwissen
      "Na ich will Party machen!", // Besuchsgrund
      "Bin etwas krank aber is mir egal.", // Gesundheit
      "Ne das erste Mal.", // wiederholter Besuch
      "Ich bin natürlich Anwalt.", // Beruf
    ]},
    // Vorlage
    { src: './media/visitors/16.png', patient: false, desired: true, answers: [
      "Kein Problem.", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "Ich werde bald 50.", // Alter
      "Nur persönliche Sachen, Portemonnaie usw.", // Habseligkeiten
      "Durch eine gute Freundin.", // Clubwissen
      "Eine Freundin feiert hier Geburtstag.", // Besuchsgrund
      "Mir geht's blendent.", // Gesundheit
      "Ja, schon mehrmals.", // wiederholter Besuch
      "Schauspieler.", // Beruf
    ]},
    // Vorlage
    { src: './media/visitors/17.png', patient: false, desired: false, answers: [
      "Man ich muss schnell rein!", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "38", // Alter
      "K.O.-Tropfen.", // Habseligkeiten
      "Durch einen Kunden.", // Clubwissen
      "Geschäftlich.", // Besuchsgrund
      "Mir geht's gut.", // Gesundheit
      "Das erste Mal.", // wiederholter Besuch
      "Ich bin Kopfgeldjäger.", // Beruf
    ]},
    // Vorlage
    { src: './media/visitors/18.png', patient: false, desired: true, answers: [
      "Okay.", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "83", // Alter
      "Geld.", // Habseligkeiten
      "Von damals.", // Clubwissen
      "Wegen der alten Erinnerungen.", // Besuchsgrund
      "Mir geht's gut.", // Gesundheit
      "Ja schon damals in den guten alten Zeiten war ich hier.", // wiederholter Besuch
      "Ich bin in Rente.", // Beruf
    ]},
    // Vorlage
    { src: './media/visitors/19.png', patient: false, desired: false, answers: [
      "MAN ICH BIN PRÄSIDENT!!", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "77", // Alter
      "Nur meinen Aktenkoffer mit rotem Knopf.", // Habseligkeiten
      "Durch einen Angestellten.", // Clubwissen
      "Ich besauf mich gerne.", // Besuchsgrund
      "Soweit gut.", // Gesundheit
      "Bin das erste Mal hier.", // wiederholter Besuch
      "Politiker.", // Beruf
    ]},
    // Vorlage
    { src: './media/visitors/20.png', patient: false, desired: true, answers: [
      "Unnötig aber sag!", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "24...das fragt man eine Frau nicht!", // Alter
      "Hab nichts dabei außer Geld.", // Habseligkeiten      "Ich weiß noch nichts. Ich lasse mich überraschen.", // Clubwissen
      "Ich will feiern hä.", // Besuchsgrund
      "Ja.", // Gesundheit
      "Nein noch nicht", // wiederholter Besuch      "Ich bin Barkeeperin", // Beruf
    ]},
    // Vorlage
    { src: './media/visitors/21.png', patient: true, desired: false, answers: [
      "Ich höre.", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "Genau will ich das nicht sagen aber auf jeden fall deutlich über", // Alter
      "Ein paar Bier.", // Habseligkeiten
      "Na Club halt.", // Clubwissen
      "Spaß was den sonst.", // Besuchsgrund
      "Ich habe ein bisschen schnupfen.", // Gesundheit
      "Ja", // wiederholter Besuch
      "Ich bin Bäckerin", // Beruf
    ]},
    // Vorlage
    { src: './media/visitors/22.png', patient: false, desired: true, answers: [
      "Ok", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "20", // Alter
      "Ich hab Geld dabei.", // Habseligkeiten
      "Is nen berühmter Club in Berlin.", // Clubwissen
      "Ich will mir den Club mal ansehen.", // Besuchsgrund
      "Jo", // Gesundheit
      "Schon zwei mal.", // wiederholter Besuch
      "Ich Studiere noch.", // Beruf
    ]},
]

const questions = [ //alle fragen, die zu verfügung stehen
  "Bevor ich dich reinlassen kann, habe ich ein paar Fragen an dich.",
  "Wie alt bist du?",
  "Was hast du bei dir?",
  "Was weißt du über den Club?",
  "Warum bist du hier?",
  "Wie fühlst du dich den heut so?",
  "Schon mal in einem Club gewesen?",
  "Was machst'n beruflich?",
]

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

function lowerScore() { //verringert das leben oder zeigt den Endscreen an
  // no health left
  if (health === 0){
    location.hash = 'game-over'
    resetGameState() //löschte den Spielstand
  } 
  else {
    health--
    healthEl.innerText = '❤️'.repeat(health)
    saveGameState(); // Speichern nach jeder Änderung des Spielstands
    
  }
}

function acceptCurrentVisitor() {
  if (currentVisitor.desired) raiseScore()  // Wenn 
  else lowerScore()
  nextVisitor()
}

function askQuestion(questionIndex) {
  const question = questions[questionIndex]
  const answer = currentVisitor.answers[questionIndex]

  const questionBtn = questionsEl.children[questionIndex]
  questionBtn.disabled = true //deaktiviert den Button (Nicht nochmal klickbar)

  questionCount++ //erhöt den Question Count (Relevant wann die Person geht)

  createEl(chatEl, 'div', 'bubble out', question) //funktion zum Erstellen der Chat Bubbles?
  setTimeout(() => {;
    const answerEl = createEl(chatEl, 'div', 'bubble in', '...')
    setTimeout(() => {
      if ((!currentVisitor.patient && questionCount > 4) || questionCount > 6) {
        answerEl.innerText = "Das wird mir hier zu blöd, ich geh woanders hin."  //Antwort bei Zu vielen Fragen
        lowerScore()
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
}

function loadGameState() { //lädt den stand des Games nach öffnen anderer Menüs
  const savedState = localStorage.getItem('gameState');
  if (savedState) {
    const gameState = JSON.parse(savedState);
    score = gameState.score;
    health = gameState.health;
    visitorIndex = gameState.visitorIndex;
    return gameState;
  }
  return null;
}

function saveGameState() { //speichert den Stand daes Games -- Wird durchgeführt nachdem eine Person reingelassen oder Weggeschickt wird
  const gameState = { score, health, visitorIndex };
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

function resetGameState() { //Setzt den Speicher Zurück, beispielsweise nach dem Tod
  score = 0;
  health = 3;
  visitorIndex = 0;
  healthEl.innerText = '❤️'.repeat(health);
  scoreEl.innerText = `${score}`;
  localStorage.removeItem('gameState');
}

questions.forEach((question, index) => {
  const button = createEl(questionsEl, 'button', 'action', question)
  button.addEventListener('click', () => askQuestion(index))
})

acceptBtn.addEventListener('click', () => acceptCurrentVisitor())
declineBtn.addEventListener('click', () => nextVisitor())

document.addEventListener('DOMContentLoaded', () => { //überprüft ob Gespeicherter Spielstand verfügbar ist
  const loadedGameState = loadGameState();
  if (loadedGameState) { // Wenn ein gespeicherter Spielstand vorhanden ist, setze den Zustand entsprechend
    score = loadedGameState.score;
    health = loadedGameState.health;
    visitorIndex = loadedGameState.visitorIndex;
    healthEl.innerText = '❤️'.repeat(health)
    scoreEl.innerText = `${score}`
  }
  setVisitor(visitorIndex);
});