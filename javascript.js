function openAnleitung() {
    window.location.href = 'Anleitung.html';
    }
function openGame(){
    window.location.href = 'game.html'
}
function openHauptseite(){
    window.location.href = 'Hauptseite.html'
}

var clicks = 0;
let lives = 3;
let highscore = 0;
var character = 0;

function qAlter() {
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
  if (character < 2) {
    document.getElementById("g-person-aussage").innerHTML = "Ich bin 24";
  } 
  else if (character >= 2 && character < 4) {
    document.getElementById("g-person-aussage").innerHTML = "Alt Genug";
  } 
  else if (character >= 4 && character < 6) {
    document.getElementById("g-person-aussage").innerHTML = "Was geht dich das An ";
  } 
  else if (character >= 6 && character < 8) {
    document.getElementById("g-person-aussage").innerHTML = "19";
  } 
  else {
    document.getElementById("g-person-aussage").innerHTML = "45 Jahre alt bin ich";
  }
  ZuVieleFragen();
}

function qHabseligkeiten(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    if(character < 2){ //sagt je nach character eine andere Antwort (Antwort ist an den Character gebunden!)
      document.getElementById("g-person-aussage").innerHTML= "Ich habe mein Portmorne, meine Schlüssel, mein Handy und einen Glücksbringer bei.";
    }
    else if(character < 4){
      document.getElementById("g-person-aussage").innerHTML= "Alt Genug";
    }
    else if(character < 6){
      document.getElementById("g-person-aussage").innerHTML= "Was geht dich das An ";
    }
    else if(character < 8){
      document.getElementById("g-person-aussage").innerHTML= "19";
    }
    else{
      document.getElementById("g-person-aussage").innerHTML= "45 Jahre alt bin ich";
    }
    ZuVieleFragen();
}

function qWissen(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    if(character < 2){ //sagt je nach character eine andere Antwort (Antwort ist an den Character gebunden!)
      document.getElementById("g-person-aussage").innerHTML= "Nicht viel, er soll gut sein und ich wollte mich davon überzeugen.";
    }
    else if(character < 4){
      document.getElementById("g-person-aussage").innerHTML= "Alt Genug";
    }
    else if(character < 6){
      document.getElementById("g-person-aussage").innerHTML= "Was geht dich das An ";
    }
    else if(character < 8){
      document.getElementById("g-person-aussage").innerHTML= "19";
    }
    else{
      document.getElementById("g-person-aussage").innerHTML= "45 Jahre alt bin ich";
    }
    ZuVieleFragen();
}

function qBesuchsgrund(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    if(character < 2){ //sagt je nach character eine andere Antwort (Antwort ist an den Character gebunden!)
      document.getElementById("g-person-aussage").innerHTML= "Ich wollte meinen Abend nicht alleine Zuhause Verbringen.";
    }
    else if(character < 4){
      document.getElementById("g-person-aussage").innerHTML= "Alt Genug";
    }
    else if(character < 6){
      document.getElementById("g-person-aussage").innerHTML= "Was geht dich das An ";
    }
    else if(character < 8){
      document.getElementById("g-person-aussage").innerHTML= "19";
    }
    else{
      document.getElementById("g-person-aussage").innerHTML= "45 Jahre alt bin ich";
    }
    ZuVieleFragen();
}

function qGesundheitsstatus(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    if(character < 2){ //sagt je nach character eine andere Antwort (Antwort ist an den Character gebunden!)
      document.getElementById("g-person-aussage").innerHTML= "Ich bin Gesund.";
    }
    else if(character < 4){
      document.getElementById("g-person-aussage").innerHTML= "Alt Genug";
    }
    else if(character < 6){
      document.getElementById("g-person-aussage").innerHTML= "Was geht dich das An ";
    }
    else if(character < 8){
      document.getElementById("g-person-aussage").innerHTML= "19";
    }
    else{
      document.getElementById("g-person-aussage").innerHTML= "45 Jahre alt bin ich";
    }
    ZuVieleFragen();
}

function qWiederholterBesuch(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    if(character < 2){ //sagt je nach character eine andere Antwort (Antwort ist an den Character gebunden!)
      document.getElementById("g-person-aussage").innerHTML= "Nein wie Gesagt, das ist Mein erster Besuch";
    }
    else if(character < 4){
      document.getElementById("g-person-aussage").innerHTML= "Alt Genug";
    }
    else if(character < 6){
      document.getElementById("g-person-aussage").innerHTML= "Was geht dich das An ";
    }
    else if(character < 8){
      document.getElementById("g-person-aussage").innerHTML= "19";
    }
    else{
      document.getElementById("g-person-aussage").innerHTML= "45 Jahre alt bin ich";
    }
    ZuVieleFragen();
}

function qBeruf(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    if(character < 2){ //sagt je nach character eine andere Antwort (Antwort ist an den Character gebunden!)
      document.getElementById("g-person-aussage").innerHTML= "Ich arbeite als Drogendealer";
    }
    else if(character < 4){
      document.getElementById("g-person-aussage").innerHTML= "Alt Genug";
    }
    else if(character < 6){
      document.getElementById("g-person-aussage").innerHTML= "Was geht dich das An ";
    }
    else if(character < 8){
      document.getElementById("g-person-aussage").innerHTML= "19";
    }
    else{
      document.getElementById("g-person-aussage").innerHTML= "45 Jahre alt bin ich";
    }
    ZuVieleFragen();
}

function qTest(){ //Keine Verschiedenen Antwort da Ausscließlich zum Testen von Funktionen Eingebaut
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
  document.getElementById("g-person-aussage").innerHTML= "Entwickleroption, zum Testen von Funktionalitäten.";
  ZuVieleFragen();
}

function ZuVieleFragen(){ //Funktion zum Abziehen der Leben bei zu Vielen Fragen
  if (clicks >= 5){
    document.getElementById("g-person-aussage").innerHTML= "Das wird mir zu Blöd, Schönen Tag noch!";
    lives--;
    updateLives();

  }
}

function updateLives() { //Funktion zum Aktualisieren der Leben
  const livesElement = document.getElementById('lives');
  livesElement.textContent = lives;
  if (lives === 0) {
    location.href = 'Loose-Screen.html' //weiterleitung zum loose Screen
}
}

function optionClicked(option) {//entscheidet ob reinlassen oder wegschciken die Richtige entscheidung ist.
  Resetclicks();
  if (option === 'wegschicken') {
    lives--;
    updateLives();
    console.log("Leben wurden verringert")
    Resetclicks();
  }
  else if(option === 'reinlassen'){// Wenn Argument am Button reinlassen, dann Highscore Erhöhen
    highscore++;
    updateHighscore();
    console.log("Highscore wurde erhöht");
    Resetclicks();
  }
}
function ClickedWegschicken(){
  Resetclicks();
  const allowedNumbers = [0, 1, 2, 3, 4, 5, 6];
  const allowedNumbers2 = [7, 8, 9, 10];
  if (allowedNumbers.includes(character)) {
    highscore++;
    updateHighscore();
    console.log("Highscore wurde erhöht");
    console.log(character);
  }
  else if (allowedNumbers2.includes(character)) {
    lives--;
    updateLives();
    console.log("Leben wurden verringert");
    console.log(character);
  }
}


function updateHighscore() { // Aktualisiere den Highscore-Text auf der Seite
  document.getElementById('highscore').innerText = highscore;
}
window.onload = function() { //lautstärkeregelung für die Hintergrundmusik
  var backgroundAudio = document.getElementById('gAudio');
  backgroundAudio.volume = 0.1;
}

function Resetclicks() {
  clicks = 0; // Setze die Variable auf den gewünschten Standardwert
  document.getElementById('clicks').innerHTML = clicks;
  SetRandomCharacter(); 

}

function SetRandomCharacter(){ //wält einen Zufälligen Character aus.
  character = Math.floor(Math.random() * 10);
  document.getElementById('clicks').innerHTML = character;
  if (character < 2){ //Zeigt den Neuen Charaqcter an
    document.getElementById('g-person-bild').src = './Bilder/Concept_Art_Persons/Drogendealer.png';
  }
  else if(character < 4){
    document.getElementById('g-person-bild').src = './Bilder/Concept_Art_Persons/Fußballer.png';
  }
  else if(character < 6){
    document.getElementById('g-person-bild').src = './Bilder/Concept_Art_Persons/Mann mit Hund.png';
  }
  else if(character < 8){
    document.getElementById('g-person-bild').src = './Bilder/Concept_Art_Persons/Obdachloser.png';
  }
  else {
    document.getElementById('g-person-bild').src = './Bilder/Concept_Art_Persons/Woman.png';
  }
}