document.addEventListener("keydown", function(event) {
    // Überprüfen, ob die gedrückte Taste die "P"-Taste ist (keyCode 80)
    if (event.keyCode === 65) {
        location.hash = 'anleitung'
    }
    if (event.keyCode ===  87) {
        location.hash = 'welten'
    }
    if (event.keyCode ===  67) {
        location.hash = 'changelog'
    }
    if (event.keyCode === 84 ) {
        location.hash = 'shortcuts'
    }
    if (event.key === "Escape" ) {
        window.history.back();
    }
  });
