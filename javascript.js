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


function qAlter(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("g-person-aussage").innerHTML= "Ich bin 24";
    ZuVieleFragen();
}

function qHabseligkeiten(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("g-person-aussage").innerHTML= "Ich habe mein Portmorne, meine Schlüssel, mein Handy und einen Glücksbringer bei.";
    ZuVieleFragen();
}

function qWissen(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("g-person-aussage").innerHTML= "Nicht viel, er soll gut sein und ich wollte mich davon überzeugen.";
    ZuVieleFragen();
}

function qBesuchsgrund(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("g-person-aussage").innerHTML= "Ich wollte meinen Abend nicht alleine Zuhause Verbringen.";
    ZuVieleFragen();
}

function qGesundheitsstatus(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("g-person-aussage").innerHTML= "Ich bin Gesund.";
    ZuVieleFragen();
}

function qWiederholterBesuch(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("g-person-aussage").innerHTML= "Nein wie Gesagt, das ist Mein erster Besuch";
    ZuVieleFragen();
}

function qBeruf(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("g-person-aussage").innerHTML= "Ich arbeite als Drogendealer";
    ZuVieleFragen();
}

function qTest(){
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

let highscore = 0;

function Entscheidung() {//entscheidet ob reinlassen oder wegschciken die Richtige entscheidung ist. Randomized, damit nicht immer gleich
  Resetclicks();
  var randomValue = Math.random(); 

  if (randomValue < 0.5) {
    // Wenn randomValue kleiner als 0.5 ist, Leben verringern
    if (lives > 0) {
      lives--;
      updateLives();
      console.log("Leben wurden verringert");
    }
  } else {
    // Wenn randomValue größer oder gleich 0.5 ist, Highscore erhöhen
    highscore++;
    updateHighscore();
    console.log("Highscore wurde erhöht");
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
  var randomValue = Math.random(); //auslosung welcher Satz von der Person gesagt wird

  if (randomValue < 0.2) {
    document.getElementById("g-person-aussage").innerHTML= "Hallo, Ich würde gerne in den club";
  } 
  else if(randomValue < 0.4){
    document.getElementById("g-person-aussage").innerHTML= "Lass mich in den Club ich musste schon so Lange warten";
  }
  else if(randomValue < 0.6){
    document.getElementById("g-person-aussage").innerHTML= "...";
  }
  else if(randomValue < 0.8){
    document.getElementById("g-person-aussage").innerHTML= "...";
  }
  else{
    document.getElementById("g-person-aussage").innerHTML= "...";
  }

  var randomValue2 = Math.random();
  
  if (randomValue2 < 0.05) {
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  } 
  else if(randomValue2 < 0.1){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Drogendealer.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.15){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Fußballer.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.2){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Mann mit Hund.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.25){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Woman.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.3){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.35){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.4){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.45){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.5){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.55){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.6){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.65){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.7){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.75){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.8){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.85){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.9){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  else if(randomValue2 < 0.95){
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  else{
    document.getElementById('g-perosnbild').src = './Bilder/Concept_Art_Persons/Obdachloser.png'; // Neuen Bildpfad setzen
  }
  
}