// Liste der Hintergrundbilder
const backgroundImages = [
    './media/landscapes/bg_1.jpeg',
    './media/landscapes/bg_2.jpeg',
    './media/landscapes/bg_3.jpeg',
    // Füge hier weitere Dateipfade für Hintergrundbilder hinzu
  ];
  
  // Funktion zum zufälligen Auswählen eines Hintergrundbilds
  function getRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
  }
  
  // Funktion zum Setzen des Hintergrundbilds
  function setRandomBackground() {
    const body = document.body;
    const randomBackground = getRandomBackground();
    body.style.backgroundImage = `url('${randomBackground}')`;
    body.style.backgroundSize = 'cover'; // Das Hintergrundbild wird so skaliert, dass es den gesamten Hintergrund bedeckt
  }
  
  // Eventlistener, um die Funktion beim Laden der Seite auszuführen
  document.addEventListener('DOMContentLoaded', setRandomBackground);
  