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
let endlessCount = -1
let starsEarned = [];

/// Liste der Besucher mit Bild und infos über Geduld und Score
const visitors = [
  // Blumenmädchen
  { src: './media/visitors/visitors_festival/01.png', patient: true, desired: true, answers: [ //Desired bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt, Patient Bestimmt die anzahl der Fragen false=4 true=6
    "Selbstverständlich.",
    "26", 
    "Ja, klar.", 
    "Nur 0,5L Wasserflasche, so wie es erlaubt ist.", 
    "Wenn Blumen nicht als Waffen zählen, nein.", 
    "So etwas kommt mir nicht in die Hände.", 
    "BITTE?! Auf keinen Fall!", 
    "Ich freue mich auf die Musik und die Pyro-Show.", 
  ]},
  // bekifftes Mädchen
  { src: './media/visitors/visitors_festival/02.png', patient: true, desired: false, answers: [
    "Jaa na kLLaAaAArrR!", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "Müsste glaube... EHhhh... 54 morgen geworden sein, oder so...", // Alter
    "JAAA.", // Habseligkeiten
    "Jaja klaro.", // Clubwissen
    "Näähh.", // Besuchsgrund
    "DIs is mir zu blööd.", // Gesundheit
    "NEIINN! *Nur in mir*:))", // wiederholter Besuch
    "Na was'n wohl?!", // Beruf
  ]},
  // auch bekiffte Freundin
  { src: './media/visitors/visitors_festival/03.png', patient: true, desired: false, answers: [
    "Was willste wiss'n?", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "Mhhhhh. Bin 23.", // Alter
    "Na sichi-michi.", // Habseligkeiten
    "Wenn du mich nüsch kontrollierst, dann nüx.", // Clubwissen
    "Meine Freundin, die eb'n da war ist jefährlich scharf, wenn de mich fragst.", // Besuchsgrund
    "En bis Zwee Raketchen sind bei mir Gang und Gebe.", // Gesundheit
    "Ich nicht aber meine Freundin VIElleIcHt:). HEHEHEHE. ", // wiederholter Besuch
    "Hehehehee!", // Beruf
  ]},
  // flirty, dirty, murty Chicken 
  { src: './media/visitors/visitors_festival/04.png', patient: true, desired: true, answers: [
    "Gern doch Süßer;).", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "32.", // Alter
    "Das Ticket für mein Herz hast du ja schon... Und das andere habe ich auch dabei.", // Habseligkeiten
    "Nur eine kleine Wasserflasche mit 500ml.", // Clubwissen
    "Ne mein Hübscher.", // Besuchsgrund
    "Ich habe nicht nur Schmetterlinge im Bauch, sondern auch Feuerwerk, so süß wie du bist;).", // Gesundheit
    "Negativ.", // wiederholter Besuch
    "Suche nur Jemanden wie dich.", // Beruf
  ]},
  // aufdringliches GÖÖRL
  { src: './media/visitors/visitors_festival/05.png', patient: false, desired: false, answers: [
    "Aber zacki.", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
    "18, nächste Frage?", // Alter
    "Ne, das hole ich mir jetzt.", // Habseligkeiten
    "NIX, WAS DENN NOCH?", // Clubwissen
    "Schweizer Taschenmesser.", // Besuchsgrund
    "Nö.", // Gesundheit
    "AUCH NICHT!", // wiederholter Besuch
    "Mich abschießen.", // Beruf
  ]},
    // Pookie Man WISCHHH
    { src: './media/visitors/visitors_festival/06.png', patient: false, desired: true, answers: [
      "Beeil dich, muss noch ne Story machen bevor die anderen da sind.", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "23!!", // Alter
      "Ja und jetzt mach hinne!", // Habseligkeiten
      "Habe nichts dabei, du weißt schon... Kann mir mit meinem Vermögen eh alles kaufen.", // Clubwissen
      "Meine Attraktivität.", // Besuchsgrund
      "Ich selbst bin halt ne scharfe Bombe... ;)", // Gesundheit
      "AUF KEINEN FALL! Was denkst du von mir?!", // wiederholter Besuch
      "Story, Fotos und sowas. Meine ganzen Follower warten schon!", // Beruf
    ]},
    // Mitarbeiterin
    { src: './media/visitors/visitors_festival/07.png', patient: true, desired: true, answers: [
      "Na dann mal los.", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "31 Jahre.", // Alter
      "Nein, aber habe meinen Mitarbeiter-Ausweis dabei.", // Habseligkeiten
      "Ich habe nichts dabei.", // Clubwissen
      "So etwas besitze ich nicht.", // Besuchsgrund
      "Dafür bin ich nicht zuständig.", // Gesundheit
      "Nein, ich arbeite hier. Sonst würde man mich feuern.", // wiederholter Besuch
      "Ich bin Background-Singer.", // Beruf
    ]},
    // Tänzerin
    { src: './media/visitors/visitors_festival/08.png', patient: false, desired: true, answers: [
      "Ja schieß los.", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "28", // Alter
      "Na sicher.", // Habseligkeiten
      "Gar nichts.", // Clubwissen
      "Nein.", // Besuchsgrund
      "Nein.", // Gesundheit
      "Nö.", // wiederholter Besuch
      "Feier ein bisschen mit Freunden.", // Beruf
    ]},

    // Bierfrau
    { src: './media/visitors/visitors_festival/09.png', patient: true, desired: false, answers: [
      "Hau raus.", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "Icg bin 24 Jahre Alt", // Alter
      "Na sicher.", // Habseligkeiten
      "Gar nichts.", // Clubwissen
      "Nein.", // Besuchsgrund
      "Nein.", // Gesundheit
      "Nö.", // wiederholter Besuch
      "Feier ein bisschen mit Freunden.", // Beruf
    ]},

    // Bgtänzerin_Mitarbeiterin
    { src: './media/visitors/visitors_festival/10.png', patient: true, desired: true, answers: [
      "Ja klar aber du weißt schon das ich hier arbeite oder?", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "24", // Alter
      "Jaa ich habe sogar eine Mitarbeiterticket.", // Habseligkeiten
      "Gar nichts ich bin schließlich zum Arbeiten hier.", // Clubwissen
      "Nein.", // Besuchsgrund
      "Nein.", // Gesundheit
      "Nein.", // wiederholter Besuch
      "Arbeiten...?!.", // Beruf
    ]},

    // Freundesgruppe 1
    { src: './media/visitors/visitors_festival/11.png', patient: true, desired: true, answers: [
      "Nagut weil du es bist..", // initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "26, 28, 32 und Jahre alt.", // Alter
      "Wir haben unsre Tickets natürlich alle dabei.", // Habseligkeiten
      "Wir haben zwei 0,5L Wasserflaschen dabei.", // Clubwissen
      "Bis auf unsere Gefährlich gute Stimmung nichts.", // Besuchsgrund
      "Nope.", // Gesundheit
      "Nein sowas verabscheuen wir.", // wiederholter Besuch
      "Feeiiieeeerrrnnnnnn!!!!!!!!!!!!!!!!!!!!.", // Beruf
    ]},

    // Freundesgruppe 2
    { src: './media/visitors/visitors_festival/12.png', patient: true, desired: true, answers: [ //Desired bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt, Patient Bestimmt die anzahl der Fragen false=4 true=6
      "Selbstverständlich.",// initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "Wir sind tatsächlich alle 24 Jahre Alt.", //Wie alt bist du?
      "Ja, natürlich.", //Hast du dein Ticket bei dir?
      "Wir haben nichts bei uns.", //Wie viel Essen und Trinken hast du bei dir?
      "Nee.", //Trägst du irgendwelche gefährlichen Gegenstände bei dir?
      "Ne ich habe ein bissl angst vor Feuerwerk.", //Hast du Pyrotechnik bei dir?
      "Hallo...nein sowas haber wir nicht.", //Bestitzt du Illegale Substanzen?
      "Wir sind zum spaß haben hier.", //Was machst du hier?
    ]},
    
    // Freundesgruppe_Frauen
    { src: './media/visitors/visitors_festival/13.png', patient: false, desired: true, answers: [ //Desired bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt, Patient Bestimmt die anzahl der Fragen false=4 true=6
      "Ja aber beeile dich bitte unsere Freunde warten schon auf uns.",// initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "Wir sind 34, 28, 28 und 36.", //Wie alt bist du?
      "Ja haben wir.", //Hast du dein Ticket bei dir?
      "Nein.", //Wie viel Essen und Trinken hast du bei dir?
      "Nein, bitte beeilen sie dich unsere Freunde warten.", //Trägst du irgendwelche gefährlichen Gegenstände bei dir?
      "Nein haben wir nicht.", //Hast du Pyrotechnik bei dir?
      "Nahein.", //Bestitzt du Illegale Substanzen?
      "Wir treffen uns mit freunden.", //Was machst du hier?
    ]},

    //Motherfucker
    { src: './media/visitors/visitors_festival/14.png', patient: false, desired: true, answers: [ //Desired bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt, Patient Bestimmt die anzahl der Fragen false=4 true=6
      "Ok.",// initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "30", //Wie alt bist du?
      "Ja.", //Hast du dein Ticket bei dir?
      "Garnichts.", //Wie viel Essen und Trinken hast du bei dir?
      "Nöö.", //Trägst du irgendwelche gefährlichen Gegenstände bei dir?
      "Nein digga.", //Hast du Pyrotechnik bei dir?
      "Neiinnnn.", //Bestitzt du Illegale Substanzen?
      "Feiern was sonst.", //Was machst du hier?
    ]},

    // Pyrotechniker
    { src: './media/visitors/visitors_festival/15.png', patient: true, desired: true, answers: [ //Desired bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt, Patient Bestimmt die anzahl der Fragen false=4 true=6
      "Jagut ich Arbeite zwar hier aber erzähl.",// initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "31", //Wie alt bist du?
      "Ja natürlich ich arbete schließlich hier.", //Hast du dein Ticket bei dir?
      "Garnichts.", //Wie viel Essen und Trinken hast du bei dir?
      "Die Rakten für die Pyroshow heute abend.", //Trägst du irgendwelche gefährlichen Gegenstände bei dir?
      "Ja habe ich für die Pyroshow...", //Hast du Pyrotechnik bei dir?
      "Nein ich bin zum Arbeiten hier.", //Bestitzt du Illegale Substanzen?
      "Ich bin hauptverantwortlich für die Pyroshow.", //Was machst du hier?
    ]},

      //Messermensch
    { src: './media/visitors/visitors_festival/16.png', patient: false, desired: false, answers: [ //Desired bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt, Patient Bestimmt die anzahl der Fragen false=4 true=6
      "Beeile dich aber.",// initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "27", //Wie alt bist du?
      "Ja habe ich.", //Hast du dein Ticket bei dir?
      "1,5L Bier.", //Wie viel Essen und Trinken hast du bei dir?
      "Nen Messer falls mir wer blöd kommt. Sicher ist sicher.", //Trägst du irgendwelche gefährlichen Gegenstände bei dir?
      "Nein heute nicht.", //Hast du Pyrotechnik bei dir?
      "Hoff mal nicht ja. Du kannst bei mir nichts kaufen.", //Bestitzt du Illegale Substanzen?
      "Na was denkst du den was ich hier machen will?", //Was machst du hier?
    ]},

      // Motherfucker nummer 2
    { src: './media/visitors/visitors_festival/17.png', patient: false, desired: true, answers: [ //Desired bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt, Patient Bestimmt die anzahl der Fragen false=4 true=6
      "Ja komm dann los.",// initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "Alt genug Bro.", //Wie alt bist du?
      "Ja natürlich.", //Hast du dein Ticket bei dir?
      "Nein habe ich nicht.", //Wie viel Essen und Trinken hast du bei dir?
      "Nein trage ich nicht...", //Trägst du irgendwelche gefährlichen Gegenstände bei dir?
      "Wo sollte ich Pyrotechnik bei mir haben?", //Hast du Pyrotechnik bei dir?
      "Ich sehe vielleicht so aus aber nein habe ich nicht.", //Bestitzt du Illegale Substanzen?
      "Mal wieder feiern an meinem freien Tag.", //Was machst du hier?
    ]},

      // Inhaber
    { src: './media/visitors/visitors_festival/18.png', patient: true, desired: true, answers: [ //Desired bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt, Patient Bestimmt die anzahl der Fragen false=4 true=6
      "Du weißt wohl nicht wer ich bin aber dan los.",// initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "Ich bin 34 Jahre alt.", //Wie alt bist du?
      "Ja schließlich habe ich das Festival organisiert.", //Hast du dein Ticket bei dir?
      "Nein habe ich nicht.", //Wie viel Essen und Trinken hast du bei dir?
      "Wenn du mich noch lange aufhälst deine Kündigung.", //Trägst du irgendwelche gefährlichen Gegenstände bei dir?
      "Jungchien...nein habe ich nicht.", //Hast du Pyrotechnik bei dir?
      "Natürlich nicht.", //Bestitzt du Illegale Substanzen?
      "Mich darum kümmern, dass alles nach Plan verläuft.", //Was machst du hier?
    ]},

      // 
    { src: './media/visitors/visitors_festival/19.png', patient: true, desired: true, answers: [ //Desired bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt, Patient Bestimmt die anzahl der Fragen false=4 true=6
      "Na klar.",// initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "31 und 32.", //Wie alt bist du?
      "Ja, klar haben wir.", //Hast du dein Ticket bei dir?
      "Nur ein bisschen Wasser für Notfälle aber weniger als 1L.", //Wie viel Essen und Trinken hast du bei dir?
      "Selbstverständlich nicht.", //Trägst du irgendwelche gefährlichen Gegenstände bei dir?
      "Nein, nachher ist ja die Show.", //Hast du Pyrotechnik bei dir?
      "Nein, sowas haben wir nicht nötig!", //Bestitzt du Illegale Substanzen?
      "Wir freuen uns auf die Musik und die Pyro-Show.", //Was machst du hier?
    ]},

      // 
    { src: './media/visitors/visitors_festival/20.png', patient: true, desired: true, answers: [ //Desired bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt, Patient Bestimmt die anzahl der Fragen false=4 true=6
      "Leg los.",// initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "22 und 25.", //Wie alt bist du?
      "Na klar.", //Hast du dein Ticket bei dir?
      "Wir haben nichts dabei.", //Wie viel Essen und Trinken hast du bei dir?
      "Neeee!?", //Trägst du irgendwelche gefährlichen Gegenstände bei dir?
      "Niemals.", //Hast du Pyrotechnik bei dir?
      "Nee.", //Bestitzt du Illegale Substanzen?
      "Sind gespannt wie es wird.", //Was machst du hier?
    ]},

      // 
    { src: './media/visitors/visitors_festival/21.png', patient: false, desired: false, answers: [ //Desired bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt, Patient Bestimmt die anzahl der Fragen false=4 true=6
      "Na komm, alter...",// initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "20", //Wie alt bist du?
      "Jo.", //Hast du dein Ticket bei dir?
      "Nix.", //Wie viel Essen und Trinken hast du bei dir?
      "Naja nur ne Handwaffe, falls wer frech wird.", //Trägst du irgendwelche gefährlichen Gegenstände bei dir?
      "Warum sollte ich.", //Hast du Pyrotechnik bei dir?
      "Hab nichts genommen, sagen wir es so.", //Bestitzt du Illegale Substanzen?
      "Bissl dealen.", //Was machst du hier?
    ]},

      // 
    { src: './media/visitors/visitors_festival/22.png', patient: true, desired: false, answers: [ //Desired bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt, Patient Bestimmt die anzahl der Fragen false=4 true=6
      "FBAFKJLCNAhfb§$!!",// initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "LKOW§°?", //Wie alt bist du?
      "GAD&%W$.", //Hast du dein Ticket bei dir?
      "NäjabasfbhsjhJHSA.", //Wie viel Essen und Trinken hast du bei dir?
      "aNHNFL§00LSF", //Trägst du irgendwelche gefährlichen Gegenstände bei dir?
      "DJAHBEW.", //Hast du Pyrotechnik bei dir?
      "DCAKDnäöÄLDA!", //Bestitzt du Illegale Substanzen?
      "KDABJBW§$JFDA%... HILF.... MIR!", //Was machst du hier?
    ]},
    
      // 
    { src: './media/visitors/visitors_festival/23_c.png', patient: true, desired: true, answers: [ //Desired bestimmt ob die Person rein darf wenn false wird Score tiefer gestellt, Patient Bestimmt die anzahl der Fragen false=4 true=6
      "Leg los DIGGA.",// initiale Antwort, sollte auf (Un-)Geduld hinweisen
      "24", //Wie alt bist du?
      "KLARO!", //Hast du dein Ticket bei dir?
      "Ne.", //Wie viel Essen und Trinken hast du bei dir?
      "NEIN BRO!", //Trägst du irgendwelche gefährlichen Gegenstände bei dir?
      "Naja nachher war doch ne Show, also ne diggi.", //Hast du Pyrotechnik bei dir?
      "Nuh-UHHHH.", //Bestitzt du Illegale Substanzen?
      "PARRTYYYYYY!!", //Was machst du hier?
    ]},

    
]



const questions = [ //alle fragen, die zu verfügung stehen
  "Ich hab noch ein paar kurze Fragen dann können sie rein.",
  "Wie alt bist du?",
  "Hast du dein Ticket bei dir?",
  "Wie viel Essen und Trinken hast du bei dir?",
  "Trägst du irgendwelche gefährlichen Gegenstände bei dir?",
  "Hast du Pyrotechnik bei dir?",
  "Bestitzt du Illegale Substanzen?",
  "Was machst du hier?",
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
  } 
  else {
    if (questionCount <= 4) {
      // Berechne den Fortschritt in Prozent für Nicht-Patienten
      const progressPercent = Math.max((3 - questionCount) / 3, 0) * 100; // Mindestwert von 0%
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
