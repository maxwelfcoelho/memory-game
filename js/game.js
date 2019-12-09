const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

import Tile from './Tile.js';

// helper functions
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

let tiles = [];
let colors = ["red", "yellow", "violet", "green", "pink", "orange", "purple", "brown", "magenta", "cyan", "red", "yellow", "violet", "green", "pink", "orange", "purple", "brown", "magenta", "cyan"];
let shuffledColors = shuffle(colors);
let flippedTiles = [];

// create tiles
for (let i = 0; i < 5; i++) {
  for(let j = 0; j < 4; j++) {
    tiles.push(new Tile(i * 150, j * 150, shuffledColors.pop()));
  }
}

function draw() {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].revealed === false) {
      tiles[i].drawDown(ctx);
    } else {
      tiles[i].drawUp(ctx);
    }
  }
}

function update() {
  if (flippedTiles.length === 2) {
    let first = flippedTiles[0];
    let second = flippedTiles[1];
    if (tiles[first].color !== tiles[second].color) {
      setTimeout(function() {
        tiles[first].revealed = false;
        tiles[second].revealed = false;
      }, 1000);
    }
    flippedTiles = [];
  }
}

function gameLoop() {
  draw();
  update();

  requestAnimationFrame(gameLoop);
}

document.addEventListener("click", function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  for (let i = 0; i < tiles.length; i++) {  
    if (flippedTiles.length <= 2 && tiles[i].is_selected(mouseX, mouseY) && tiles[i].revealed !== true) {
      tiles[i].revealed = true;
      flippedTiles.push(i);
    }
  }
});

gameLoop();

