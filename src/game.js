import CONSTANTS from './constants.js';
import PALETTE from './palette.js';
import CONFIG from './config.js';

import Player from './player.js';
import LevelManager from './level-manager.js';

export default class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.pixelSize = this.canvas.clientWidth / CONFIG.RESOLUTION.WIDTH;
    this.state = CONFIG.GAME_STATES.MENU;

    this.lastFpsUpdateTime = 0;
    this.lastFpsCount = 0;

    this.time = 0;
    this.oldTime = 0;

    this.player = new Player();
    this.levelManager = new LevelManager();

    this.addGameEventListeners();
  }

  start() {
    this.handleLevelLoad(1);

    // Start game
    this.gameLoop();
  }

  handleLevelLoad(levelNumber) {
    this.levelManager.loadLevel(levelNumber);

    let level = this.levelManager.loadedLevel;
    let player = this.player;

    player.posX = level.STARTING_POSITION.X;
    player.posY = level.STARTING_POSITION.Y;

    player.dirX = level.STARTING_DIRECTION.X;
    player.dirY = level.STARTING_DIRECTION.Y;

    player.planeX = level.STARTING_CAMERA.X;
    player.planeY = level.STARTING_CAMERA.Y;

    this.state = CONFIG.GAME_STATES.ACTIVE;
  }

  togglePausePlay() {
    if (this.state === CONFIG.GAME_STATES.ACTIVE) {
      this.state = CONFIG.GAME_STATES.PAUSED;
    } else {
      this.state = CONFIG.GAME_STATES.ACTIVE;
      this.gameLoop();
    }
  }

  drawPauseScreen() {
    this.context.fillStyle = PALETTE.TRANSPARENT_BLACK;
    this.context.fillRect(0, 0, CONFIG.RESOLUTION.WIDTH, CONFIG.RESOLUTION.HEIGHT);

    this.context.fillStyle = PALETTE.WHITE;
    this.context.fillRect(CONFIG.RESOLUTION.WIDTH / 2 - 50, CONFIG.RESOLUTION.HEIGHT / 2 - 50, 40, 100);
    this.context.fillRect(CONFIG.RESOLUTION.WIDTH / 2 + 10, CONFIG.RESOLUTION.HEIGHT / 2 - 50, 40, 100);
  }

  drawFloorAndCeiling() {
    // Ceiling
    this.context.fillStyle = this.levelManager.loadedLevel.COLORS.CEILING;
    this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight / 2);

    // Floor
    this.context.fillStyle = this.levelManager.loadedLevel.COLORS.FLOOR;
    this.context.fillRect(0, this.canvas.clientHeight / 2, this.canvas.clientWidth, this.canvas.clientHeight / 2);
  }

  drawFpsCounter() {
    let fpsText = `FPS: ${this.lastFpsCount}`;

    this.context.lineWidth = 4;
    this.context.font = CONSTANTS.FPS_COUNTER_FONT;
    this.context.strokeStyle = PALETTE.BLACK;
    this.context.fillStyle = PALETTE.WHITE;
    this.context.strokeText(fpsText, 10, 30);
    this.context.fillText(fpsText, 10, 30);
  }

  addGameEventListeners() {
    document.addEventListener('keyup', (event) => {
      switch (event.keyCode) {
        case 27:
          this.togglePausePlay();
          event.preventDefault();
          event.stopPropagation();
      }
    });
  }

  gameLoop() {
    let level = this.levelManager.loadedLevel;
    let player = this.player;

    this.drawFloorAndCeiling();

    // Loop through every vertical line on the canvas
    for (let x = 0; x < CONFIG.RESOLUTION.WIDTH; x++) {

      // Find the position of the ray we are checking on the camera plane, from -1 to 1
      let cameraX = 2 * x / CONFIG.RESOLUTION.WIDTH - 1;

      // Calculate ray vector
      let rayDirX = player.dirX + player.planeX * cameraX;
      let rayDirY = player.dirY + player.planeY * cameraX;

      // Save the square on the map the player is in
      let mapX = Math.floor(player.posX);
      let mapY = Math.floor(player.posY);

      let sideDistX, sideDistY;

      // Distances required for ray to travel from one map square to the next
      let deltaDistX = Math.sqrt(1 + (rayDirY * rayDirY) / (rayDirX * rayDirX));
      let deltaDistY = Math.sqrt(1 + (rayDirX * rayDirX) / (rayDirY * rayDirY));

      // Used later to calculate "real" distance to the wall to prevent fisheye effect
      let perpWallDist;

      // General direction the ray is travelling in
      let stepX, stepY;

      let isWallHit = false;

      // Which side of the wall has been hit (for texturing purposes)
      let side;

      if (rayDirX < 0) {
        stepX = -1;
        sideDistX = (player.posX - mapX) * deltaDistX;
      } else {
        stepX = 1;
        sideDistX = (mapX + 1.0 - player.posX) * deltaDistX;
      }

      if (rayDirY < 0) {
        stepY = -1;
        sideDistY = (player.posY - mapY) * deltaDistY;
      } else {
        stepY = 1;
        sideDistY = (mapY + 1.0 - player.posY) * deltaDistY;
      }

      while (!isWallHit) {
        if (sideDistX < sideDistY) {
          sideDistX += deltaDistX;
          mapX += stepX;
          side = 0;
        } else {
          sideDistY += deltaDistY;
          mapY += stepY;
          side = 1;
        }

        if (level.MAP[mapX][mapY] > 0) {
          isWallHit = true;
        }
      }

      if (side === 0) {
        perpWallDist = Math.abs((mapX - player.posX + (1 - stepX) / 2) / rayDirX);
      } else {
        perpWallDist = Math.abs((mapY - player.posY + (1 - stepY) / 2) / rayDirY);
      }

      let lineHeight = parseInt(CONFIG.RESOLUTION.HEIGHT / perpWallDist);

      let lineStart = (CONFIG.RESOLUTION.HEIGHT - lineHeight) / 2;

      if (lineStart < 0) {
        lineStart = 0;
      }

      if (side === 0) {
        this.context.fillStyle = level.COLORS.WALL_LIGHT;
      } else {
        this.context.fillStyle = level.COLORS.WALL_DARK;
      }

      this.context.fillRect(x * this.pixelSize, lineStart * this.pixelSize, this.pixelSize, lineHeight * this.pixelSize);

      if (CONFIG.DEBUGGING) {
        this.context.strokeStyle = level.COLORS.WALL_OUTLINE;
        this.context.strokeRect(x * this.pixelSize, lineStart * this.pixelSize, this.pixelSize, lineHeight * this.pixelSize);
      }
    }

    this.oldTime = this.time;
    this.time = Date.now();

    let frameTime = (this.time - this.oldTime) / 1000;

    if (this.lastFpsUpdateTime === 0 || this.lastFpsUpdateTime + 500 < this.time) {
      this.lastFpsUpdateTime = this.time;
      this.lastFpsCount = Math.floor(1 / frameTime);
    }

    this.drawFpsCounter();

    player.updatePosition(level, frameTime);
    player.updateDirection(frameTime);

    if (this.state === CONFIG.GAME_STATES.ACTIVE) {
      requestAnimationFrame(this.gameLoop.bind(this));
    } else {
      this.drawPauseScreen();
    }
  }
}
