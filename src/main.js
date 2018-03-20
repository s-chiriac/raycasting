/**
 * A two dimensional array describing the level
 * 0's are empty spaces, 1's are walls
 *
 * @type Object
 */
const LEVEL_1_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

/**
 * The resolution of the game
 *
 * @type {{WIDTH: number, HEIGHT: number}}
 */
const RESOLUTION = {
  WIDTH: 1920,
  HEIGHT: 1080
};

// Canvas and canvas context
let canvas;
let context;

// The size of a canvas pixel
let pixelSize;

// Game state
let gameActive = false;

// Player position
let posX, posY;

// Player direction
let dirX, dirY;

// Camera plane
let planeX, planeY;

// Used to work out FPS and movement/rotation amounts
let time, oldTime, frameTime;

// Speed of movement and rotation
let moveSpeed, rotSpeed;

// Describe which player movement directions are active
let left = false;
let right = false;
let up = false;
let down = false;


function game() {
  canvas = document.getElementById('canvas');

  pixelSize = canvas.clientWidth / RESOLUTION.WIDTH;

  context = canvas.getContext('2d');

  startGame();
}

function startGame() {
  posX = 12;
  posY = 12;

  dirX = -1;
  dirY = 0;

  planeX = 0;
  planeY = 1;

  gameActive = true;

  // Start game
  gameLoop();
}

function gameLoop() {
  // Fill top half with a black rectangle
  context.fillStyle = 'rgb(0, 0, 0)';
  context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight / 2);

  // Fill bottom half with dark grey rectangle
  context.fillStyle = 'rgb(48, 48, 48)';
  context.fillRect(0, canvas.clientHeight / 2, canvas.clientWidth, canvas.clientHeight / 2);

  // Loop through every vertical line on the canvas
  for (let x = 0; x < RESOLUTION.WIDTH; x++) {

    // Find the position of the ray we are checking on the camera plane, from -1 to 1
    let cameraX = 2 * x / RESOLUTION.WIDTH - 1;

    // Calculate ray vector
    let rayDirX = dirX + planeX * cameraX;
    let rayDirY = dirY + planeY * cameraX;

    // Save the square on the map the player is in
    let mapX = Math.floor(posX);
    let mapY = Math.floor(posY);

    let sideDistX, sideDistY;

    // Distances required for ray to travel from one map square to the next
    let deltaDistX = Math.sqrt(1 + (rayDirY * rayDirY) / (rayDirX * rayDirX));
    let deltaDistY = Math.sqrt(1 + (rayDirX * rayDirX) / (rayDirY * rayDirY));

    // Used later to calculate "real" distance to the wall to prevent fisheye effect
    let perpWallDist;

    // General direction the ray is travelling in
    let stepX, stepY;

    // 1 if a wall is hit, 0 otherwise
    let hit = 0;

    // Which side of the wall has been hit (for texturing purposes)
    let side;

    if (rayDirX < 0) {
      stepX = -1;
      sideDistX = (posX - mapX) * deltaDistX;
    } else {
      stepX = 1;
      sideDistX = (mapX + 1.0 - posX) * deltaDistX;
    }

    if (rayDirY < 0) {
      stepY = -1;
      sideDistY = (posY - mapY) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (mapY + 1.0 - posY) * deltaDistY;
    }

    while (hit === 0) {
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        mapX += stepX;
        side = 0;
      } else {
        sideDistY += deltaDistY;
        mapY += stepY;
        side = 1;
      }

      if (LEVEL_1_MAP[mapX][mapY] > 0) {
        hit = 1;
      }
    }

    if (side === 0) {
      perpWallDist = Math.abs((mapX - posX + (1 - stepX) / 2) / rayDirX);
    } else {
      perpWallDist = Math.abs((mapY - posY + (1 - stepY) / 2) / rayDirY);
    }

    let lineHeight = parseInt(RESOLUTION.HEIGHT / perpWallDist);

    let lineStart = (RESOLUTION.HEIGHT - lineHeight) / 2;

    if (lineStart < 0) {
      lineStart = 0;
    }

    if (side === 0) {
      context.fillStyle = 'rgb(0, 0, 255)';
    } else {
      context.fillStyle = 'rgb(0, 0, 200)';
    }

    context.fillRect(x * pixelSize, lineStart * pixelSize, pixelSize, lineHeight * pixelSize);
  }

  oldTime = time;
  time = Date.now();

  frameTime = (time - oldTime) / 1000;

  requestAnimationFrame(gameLoop);

  moveSpeed = frameTime * 5;
  rotSpeed = frameTime * 3;

  let x, y;

  if (up) {
    x = Math.floor(posX + dirX * moveSpeed);
    y = Math.floor(posY);

    if (LEVEL_1_MAP[x][y] === 0) {
      posX += dirX * moveSpeed;
    }

    x = Math.floor(posX);
    y = Math.floor(posY + dirY * moveSpeed);

    if (LEVEL_1_MAP[x][y] === 0) {
      posY += dirY * moveSpeed;
    }
  }

  if (down) {
    x = Math.floor(posX - dirX * moveSpeed);
    y = Math.floor(posY);

    if (LEVEL_1_MAP[x][y] === 0) {
      posX -= dirX * moveSpeed;
    }

    x = Math.floor(posX);
    y = Math.floor(posY - dirY * moveSpeed);

    if (LEVEL_1_MAP[x][y] === 0) {
      posY -= dirY * moveSpeed;
    }
  }

  if (left) {
    let oldDirX = dirX;
    dirX = dirX * Math.cos(rotSpeed) - dirY * Math.sin(rotSpeed);
    dirY = oldDirX * Math.sin(rotSpeed) + dirY * Math.cos(rotSpeed);

    let oldPlaneX = planeX;
    planeX = planeX * Math.cos(rotSpeed) - planeY * Math.sin(rotSpeed);
    planeY = oldPlaneX * Math.sin(rotSpeed) + planeY * Math.cos(rotSpeed);
  }

  if (right) {
    let oldDirX = dirX;
    dirX = dirX * Math.cos(-rotSpeed) - dirY * Math.sin(-rotSpeed);
    dirY = oldDirX * Math.sin(-rotSpeed) + dirY * Math.cos(-rotSpeed);

    let oldPlaneX = planeX;
    planeX = planeX * Math.cos(-rotSpeed) - planeY * Math.sin(-rotSpeed);
    planeY = oldPlaneX * Math.sin(-rotSpeed) + planeY * Math.cos(-rotSpeed);
  }
}

function updateDirection(event, direction, value) {
  direction = value;

  event.preventDefault();
  event.stopPropagation();
}

document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 37:
      updateDirection(event, left, true);
      break;
    case 39:
      updateDirection(event, right, true);
      break;
    case 38:
      updateDirection(event, up, true);
      break;
    case 40:
      updateDirection(event, down, true);
      break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.keyCode) {
    case 37:
      updateDirection(event, left, false);
      break;
    case 39:
      updateDirection(event, right, false);
      break;
    case 38:
      updateDirection(event, up, false);
      break;
    case 40:
      updateDirection(event, down, false);
      break;
  }
});

game();