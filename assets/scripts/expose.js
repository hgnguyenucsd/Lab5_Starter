// expose.js

window.addEventListener("DOMContentLoaded", init);

function init() {
  // TODO

  // For selecting the correct horn image & horn sound.
  const selectHorn = document.getElementById("horn-select");
  const image = document.querySelector("#expose > img");
  const audio = document.querySelector(".hidden");
  let selected = "";

  // For playing the audio and confetti for the party horn.
  const button = document.querySelector("#expose button");
  const jsConfetti = new JSConfetti();

  // For volume control icon and actual volume level.
  const volume_icon = document.querySelector("#volume-controls > img");
  let level = "";

  // Event Listener for setting the correct image and audio upon selection.
  selectHorn.addEventListener("change", (event) => {
    selected = event.target.value;
    if (selected === "air-horn") {
      image.src = "assets/images/air-horn.svg";
      audio.src = "assets/audio/air-horn.mp3";
    } else if (selected === "party-horn") {
      image.src = "assets/images/party-horn.svg";
      audio.src = "assets/audio/party-horn.mp3";
    } else if (selected === "car-horn") {
      image.src = "assets/images/car-horn.svg";
      audio.src = "assets/audio/car-horn.mp3";
    }
  });

  // Event Listener for playing the audio and adding confetti for the party horn.
  button.addEventListener("click", (event) => {
    button.onclick = audio.play();

    if (selected === "party-horn" && level != 0) {
      jsConfetti.addConfetti(); //Only add confetti when horn not muted and party horn selected.
    }
  });

  // Event Listener for sound adjustion and sound icon.
  volume.addEventListener("input", (event) => {
    level = event.target.value;
    audio.volume = event.target.value * 0.01;
    if (level == 0) {
      volume_icon.src = "assets/icons/volume-level-0.svg";
    } else if (level > 0 && level < 33) {
      volume_icon.src = "assets/icons/volume-level-1.svg";
    } else if (level > 32 && level < 67) {
      volume_icon.src = "assets/icons/volume-level-2.svg";
    } else {
      volume_icon.src = "assets/icons/volume-level-3.svg";
    }
  });
}

// Note: Picture sizes readjust weirdly.
