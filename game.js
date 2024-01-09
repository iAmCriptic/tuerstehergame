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

/// Liste der Besucher mit Bild und infos über Geduld und Score
const visitors = [
  // Drug Dealer
  { src: './media/visitors/01.png', patient: false, desired: false, answers: [ //Desiree bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt 
    "Wenns sein muss...", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "23", // Alter
    "Wieso willst du das wissen?", // Habseligkeiten
    "Hier hat man Privatssphäre.", // Clubwissen
    "Warum gehst du denn in Clubs?", // Besuchsgrund
    "Ging mir schon schlechter.", // Gesundheit
    "Ständig.", // wiederholter Besuch
    "Ich bin mein eigener Chef.", // Beruf
  ]},
  // Footballer
  { src: './media/visitors/02.png', patient: true, desired: true, answers: [
    "Klar, schieß los!", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "X", // Alter
    "Nichts besonderes, hier schau selbst...", // Habseligkeiten
    "Wurde mir empfohlen.", // Clubwissen
    "Party mit Freunden.", // Besuchsgrund
    "Mir gehts gut.", // Gesundheit
    "Ein paar mal.", // wiederholter Besuch
    "Ich bin Sportler.", // Beruf
  ]},
  // Dog Owner
  { src: './media/visitors/03.png', patient: true, desired: true, answers: [
    "Klar, schieß los!", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "X", // Alter
    "Nichts besonderes, hier schau selbst...", // Habseligkeiten
    "Wurde mir empfohlen.", // Clubwissen
    "Party mit Freunden.", // Besuchsgrund
    "Mir gehts gut.", // Gesundheit
    "Ein paar mal.", // wiederholter Besuch
    "Ich arbeite bei der Bank.", // Beruf
  ]},
  // Homeless
  { src: './media/visitors/04.png', patient: true, desired: false, answers: [
    "Klar, schieß los!", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "X", // Alter
    "Nichts.", // Habseligkeiten
    "Die lange Schlange vor der Tür spricht dafür, dass es hier gut ist.", // Clubwissen
    "Ablenkung.", // Besuchsgrund
    "Geht so.", // Gesundheit
    "Ein paar Male.", // wiederholter Besuch
    "Früher war ich auch Abenteurer, aber dann habe ich einen Pfeil ins Knie bekommen.", // Beruf
  ]},
  // Business Woman
  { src: './media/visitors/05.png', patient: false, desired: true, answers: [
    "Wenn es denn unbedingt sein muss!", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "42", // Alter
    "Meine Geldbörse, mein Handy und eine Pistole... nur ein Scherz.", // Habseligkeiten
    "Wurde mir empfohlen.", // Clubwissen
    "Ich treffe mich hier mit Kollegen.", // Besuchsgrund
    "Mir gehts prima.", // Gesundheit
    "Ein paar mal.", // wiederholter Besuch
    "Ich leite erfolgreich ein mittelständisches Unternehmen.", // Beruf
  ]},
]

const questions = [
  "Bevor ich dich reinlassen kann, habe ich ein paar Fragen an dich.",
  "Wie alt bist du?",
  "Was hast du bei dir?",
  "Was weißt du über den Club?",
  "Warum bist du hier?",
  "Wie fühlst du dich?",
  "Schon mal in einem Club gewesen?",
  "Was machst du beruflich?",

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

function nextVisitor() {
  questionCount = 0
  visitorIndex++
  if (visitorIndex >= visitors.length) visitorIndex = 0
  setVisitor(visitorIndex)
}

function raiseScore() { //Erhöt den Score 
  score++
  scoreEl.innerText = `${score}`
}

function lowerScore() {
  // no health left
  if (health === 0) location.hash = 'game-over'
  else {
    health--
    healthEl.innerText = '❤️'.repeat(health)
  }
}

function acceptCurrentVisitor() {
  if (currentVisitor.desired) raiseScore()
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

questions.forEach((question, index) => {
  const button = createEl(questionsEl, 'button', 'action', question)
  button.addEventListener('click', () => askQuestion(index))
})

acceptBtn.addEventListener('click', () => acceptCurrentVisitor())
declineBtn.addEventListener('click', () => nextVisitor())

setVisitor(visitorIndex)
