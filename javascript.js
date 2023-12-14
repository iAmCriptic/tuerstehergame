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
     // Falsch beantwortet
    lives--;
    updateLives();

  }
}

function updateLives() { //Funktion zum Aktualisieren der Leben
  const livesElement = document.getElementById('lives');
  livesElement.textContent = lives;
  if (lives === 0) {
    // Keine Leben mehr übrig, Spiel beenden oder weitere Aktionen durchführen
    location.href = 'Loose-Screen.html' //weiterleitung zum loose Screen
}
}

