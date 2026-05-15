let board;
const column count = 21;
const row count = 21;
const title size= 50;
const boardWidth = column count * title size;
const boardHeight = row count * title size;

let context;
let blue ghost image;
let red ghost image;
let cherry image;
let cherry 2 image;
let orange ghost image;
let pacman down image;
let pacman up image;
let pacman left image;
let pacman right image;
let pinkghost image;
let scared ghost image;
let wall image;

const tileMap = [
        "xxxxxxxxxxxxxxxxxxxxx",
        "xx       x      xx x ",
        "x x x xx x x x x x x ",
        "X XX XXX X XXX XX X  ",
        "X                 X x",
        "X X XXX X X XXX X X x",
        "X X     X X     X X x", 
        "X XXX XXXXXX XXX X X x",
        "X     X      X     X x",
        "XXXXX X XXXXX X XXXXX x",
        "X     X      X     X x",
        "X XXX XXXXXX XXX X X x",
        "X X     X X     X X x",
        "X X XXX X X XXX X X x",
        "X X     X X     X X x",
        "X XXX XXXXXX XXX X X x",
        "X                 X x",
        "X XXX X X XXX X XXX x",
        "X     X X     X     x",
        "X XXX X X XXX X XXX x",
        "xxxxxxxxxxxxxxxxxxxxx",
        "                    x"
];
    const walls = new Set();
    const foods = new Set();
    const ghosts = new Set();
    let pacman;
    const directions = [w,a,s,d];
    let score = 0;
    let lives = 5;
    let gamerOver = false;

    window.onload = function() {
        board = document.getElementById("board");
        board.width = boardWidth;
        board.height = boardHeight;
        context = board.getContext("2d");

        load images();
        load map ();
         
        for (let ghost of ghosts .values()){
            const newdirection = directions[Math.floor(Math.random() *3)];
            ghost.updatedirection(newdirection);
        }
        uapdate();
        document.addEventListener("keydown", changeDirection);
    }
     function load images() {
        wallImage = new image();
        wallImage.src = "./wall.png";
        blueGhostImage = new image();
        blueghostImage.src = "./blueghost.png";
        redGhostImage = new image();
        redGhostImage.src = "./redghost.png";
        orangeGhostImage = new image(); 
        orangeGhostImage.src = "./orangeghost.png";
        pinkGhostImage = new image();
        pinkGhostImage.src = "./pinkghost.png";
        scaredGhostImage = new image();
        scaredGhostImage.src = "./scaredghost.png";
        cherryImage = new image();
        cherryImage.src = "./cherry.png";
        cherry2Image = new image();
        cherry2Image.src = "./cherry2.png";
        pacmanDownImage = new image();
        pacmanDownImage.src = "./pacman_down.png";
        pacmanUpImage = new image();
        pacmanUpImage.src = "./pacman_up.png";
        pacmanLeftImage = new image();
        pacmanLeftImage.src = "./pacman_left.png";
        pacmanRightImage = new image();
        pacmanRightImage.src = "./pacman_right.png";
     }
     function load map() {
        walls.clear();
        foods.clear();
        ghosts.clear();
        for (let r=0; r< rowcount; r++){
            for (let c=0; c< column count; c++){
                const row = tileMap[r];
                const tileMapchar = row[c];
                const x= c * title size;
                const y= r * title size;
                if (tileMapchar === "x"){
                    const wall = new wall(x,y,title size,title size);
                    walls.add(wall)          
           }
                else if (tileMapchar === " "){
                    const ghost = new block(blueGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'o') { //orange ghost
                const ghost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'p') { //pink ghost
                const ghost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'r') { //red ghost
                const ghost = new Block(redGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'P') { //pacman
                pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
            }
            else if (tileMapChar == ' ') { //empty is food
                const food = new Block(null, x + 14, y + 14, 4, 4);
                foods.add(food);
            }
            }
        }
    }
    function update() {
    if (gameOver) {
        return;
    }
    move();
    draw();
    setTimeout(update, 50); //1000/50 = 20 FPS
}
function draw() {
    context.clearrect(0, 0, board.width, board.height);
   context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
    for (let ghost of ghosts.values()) {
        context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
    }
    
    for (let wall of walls.values()) {
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
    }

    context.fillStyle = "white";
    for (let food of foods.values()) {
        context.fillRect(food.x, food.y, food.width, food.height);
    }
    