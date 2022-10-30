'use strict'
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomId() {
  var letters = '0123456789ABCDEF';
  var id = '';
  for (var i = 0; i < 6; i++) {
    id += letters[Math.floor(Math.random() * 9)];
  }
  return id;
}

function getRandomSentence() {
  var words = [' i couldnt',' run up',' cracked',' the world',' around us',' makes sense',' shouldnt go',' in a circle',' went up',
  ' so funny',' but why',' does not simply',' he did',' total nonsense'];
  var sentence = '';
  for (var i = 0; i < 5; i++) {
    sentence += words[Math.floor(Math.random() * words.length)];
  }
  return sentence;
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}