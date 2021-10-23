// explore.js

window.addEventListener("DOMContentLoaded", init);

const voiceSelect = document.querySelector("#voice-select");
const text = document.getElementById("text-to-speak");
const button = document.querySelector("#explore > button");
const picture = document.querySelector("#explore > img");
let selectedOption = "";
let utterance = new SpeechSynthesisUtterance("");
let voices = [];

function init() {
  // TODO

  // This block of code came from MDN Web Docs for SpeechSynthesis with some very slight modifications.
  // Its purpose is to extract all the possible voices and add them as options to a selection list on load.
  function populateVoiceList() {
    voices = speechSynthesis.getVoices();

    for (var i = 0; i < voices.length; i++) {
      var option = document.createElement("option");
      option.textContent = voices[i].name + " (" + voices[i].lang + ")";

      if (voices[i].default) {
        option.textContent += " -- DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  populateVoiceList();

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  // Setting the text to be uttered to the value being inputted in the text area.
  text.addEventListener("input", (event) => {
    utterance.text = event.target.value;
  });

  // This block of code came from MDN Web Docs for SpeechSynthesis with some slight modifications.
  // Its purpose is to go through all of the voices from the list that we made and look for the correct voice to use from the selection.
  voiceSelect.addEventListener("change", (event) => {
    selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
    console.log(selectedOption);
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterance.voice = voices[i];
      }
    }
  });

  // Clicking the "Press to Talk" button will cause the text to be said and the face icon changes accordingly to that.
  button.addEventListener("click", (event) => {
    if (selectedOption != "") {
      button.onclick = speechSynthesis.speak(utterance);
    }

    utterance.addEventListener("start", (event) => {
      picture.src = "assets/images/smiling-open.png";
    });
    utterance.addEventListener("end", (event) => {
      picture.src = "assets/images/smiling.png";
    });
  });
}
