const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Tile {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = 140;
        this.color = color;
    }

    drawFaceDown() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    drawFaceUp() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    isSelected(x, y) {
        if (x >= this.x && x <= this.x + this.size &&
            y >= this.y && y <= this.y + this.size) {
            return true;
        }
    }
}

let tiles = [];
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
        tiles.push(new Tile(i * 150, j * 150, "blue"));
    }
}

for (let i = 0; i < tiles.length; i++) {
    tiles[i].drawFaceDown();
}

document.addEventListener('click', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].isSelected(x, y)) {
            tiles[i].drawFaceUp();
        }
    }
});
