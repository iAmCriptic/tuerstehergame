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
var life = 0;


function qAlter(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("g-person-aussage").innerHTML= "Ich bin 24";
    if (clicks >= 5){
      document.getElementById("g-person-aussage").innerHTML= "Das wird mir zu Blöd, Schönen Tag noch!";
  }
}
function qHabseligkeiten(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("g-person-aussage").innerHTML= "Ich habe mein Portmorne, meine Schlüssel, mein Handy und einen Glücksbringer bei.";
    if (clicks >= 5){
      document.getElementById("g-person-aussage").innerHTML= "Das wird mir zu Blöd, Schönen Tag noch!";
  }
}
function qWissen(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("g-person-aussage").innerHTML= "Nicht viel, er soll gut sein und ich wollte mich davon überzeugen.";
    if (clicks >= 5){
      document.getElementById("g-person-aussage").innerHTML= "Das wird mir zu Blöd, Schönen Tag noch!";
  }
}
function qBesuchsgrund(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("g-person-aussage").innerHTML= "Ich wollte meinen Abend nicht alleine Zuhause Verbringen.";
    if (clicks >= 5){
      document.getElementById("g-person-aussage").innerHTML= "Das wird mir zu Blöd, Schönen Tag noch!";
  }
}
function qGesundheitsstatus(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("g-person-aussage").innerHTML= "Ich bin Gesund.";
    if (clicks >= 5){
      document.getElementById("g-person-aussage").innerHTML= "Das wird mir zu Blöd, Schönen Tag noch!";
  }
}
function qWiederholterBesuch(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("g-person-aussage").innerHTML= "Nein wie Gesagt, das ist Mein erster Besuch";
    if (clicks >= 5){
      document.getElementById("g-person-aussage").innerHTML= "Das wird mir zu Blöd, Schönen Tag noch!";
  }
}
function qBeruf(){
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("g-person-aussage").innerHTML= "Ich arbeite als Drogendealer";
    if (clicks >= 5){
      document.getElementById("g-person-aussage").innerHTML= "Das wird mir zu Blöd, Schönen Tag noch!";
  }
}
function qTest(){
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
  document.getElementById("g-person-aussage").innerHTML= "Entwickleroption, zum Testen von Funktionalitäten.";
  if (clicks >= 5){
    document.getElementById("g-person-aussage").innerHTML= "Das wird mir zu Blöd, Schönen Tag noch!";
  }
}