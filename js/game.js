const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#E6E5E1";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function Tile(x, y) {
    this.x = x;
    this.y = y;
    this.size = 175;
}

Tile.prototype.drawFaceDown = function() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.size, this.size);
}

Tile.prototype.drawFaceUp = function() {
    ctx.fillStyle = "Red";
    ctx.fillRect(this.x, this.y, this.size, this.size);
}

const ROW_SIZE = 4;
const COLUMN_SIZE = 3
let tiles = [];
let exposed = new Array(12).fill(false);
exposed[0] = true;
for (let i = 0; i < ROW_SIZE; i++) {
    for (let j = 0; j < COLUMN_SIZE; j++) {
        tiles.push(new Tile(i * 200, j * 200));
    }
}
console.log(tiles);
for (let i = 0; i < tiles.length; i++) {
    if (exposed[i] === false) {
        tiles[i].drawFaceDown();
    } else {
        tiles[i].drawFaceUp();
    }
}
