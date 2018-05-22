import bowser from 'bowser';

import CONSTANTS from './constants.js';
import PALETTE from './palette.js';
import TEXTURES from './textures.js';
import CONFIG from './config.js';

import Player from './player.js';
import LevelManager from './services/level-manager.js';

class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    this.zBuffer = [];

    this.state = CONFIG.GAME_STATES.MENU;
    this.dirTouchX = 0;

    this.lastFpsUpdateTime = 0;
    this.lastFpsCount = 0;

    this.time = 0;
    this.oldTime = 0;

    this.player = new Player();
    this.levelManager = new LevelManager();

    if (bowser.mobile || bowser.tablet) {
      this.createJoystick();
    }

    this.sizeCanvas();
    this.addGameEventListeners();
  }

  start() {
    this.handleLevelLoad(1);
    this.drawPauseScreen();
  }

  sizeCanvas() {
    let expectedWidth = window.innerHeight / 9 * 16;

    if (expectedWidth === window.innerWidth) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    } else if (expectedWidth < window.innerWidth) {
      this.canvas.width = expectedWidth;
      this.canvas.height = window.innerHeight;
    } else {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerWidth / 16 * 9;
    }

    this.unit = this.canvas.height * 0.01;
  }

  createJoystick() {
    let outerJoystick = new Image();
    let innerJoystick = new Image();

    outerJoystick.src = TEXTURES.JOYSTICK.OUTER;
    innerJoystick.src = TEXTURES.JOYSTICK.INNER;

    this.joystick = {
      outer: {
        image: outerJoystick,
        x: 0,
        y: 0,
      },
      inner: {
        image: innerJoystick,
        x: 0,
        y: 0,
      },
      delta: {
        x: 0,
        y: 0,
      },
      active: false,
    };
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
  }

  togglePausePlay() {
    if (this.state === CONFIG.GAME_STATES.ACTIVE) {
      this.state = CONFIG.GAME_STATES.PAUSED;
    } else {
      this.state = CONFIG.GAME_STATES.ACTIVE;
      this.player.addPlayerControlListeners();
      this.gameLoop();
    }
  }

  handleNewFrame() {
    let frameTime = (this.time - this.oldTime) / 1000;

    this.drawFpsCounter(frameTime);

    if (bowser.mobile || bowser.tablet) {
      if (this.joystick.active) {
        this.drawJoystick();
        this.player.forward = this.joystick.delta.y / (this.unit * 5);
        this.player.sideways = this.joystick.delta.x / (this.unit * 5);
      }
    }

    this.player.updatePosition(this.levelManager.loadedLevel, frameTime);
  }

  handleStateUpdates() {
    if (this.state === CONFIG.GAME_STATES.ACTIVE) {
      requestAnimationFrame(this.gameLoop.bind(this));
    } else {
      this.player.removePlayerControlListeners();
      this.drawPauseScreen();
    }
  }

  drawPauseScreen() {
    this.context.fillStyle = PALETTE.TRANSPARENT_BLACK;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = PALETTE.WHITE;
    this.context.fillRect(this.canvas.width / 2 - this.unit * 10, this.canvas.height / 2 - this.unit * 10, this.unit * 8, this.unit * 20);
    this.context.fillRect(this.canvas.width / 2 + this.unit * 2, this.canvas.height / 2 - this.unit * 10, this.unit * 8, this.unit * 20);
  }

  drawFloorAndCeiling() {
    // Ceiling
    this.context.fillStyle = this.levelManager.loadedLevel.COLORS.CEILING;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height / 2);

    // Floor
    this.context.fillStyle = this.levelManager.loadedLevel.COLORS.FLOOR;
    this.context.fillRect(0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2);
  }

  drawLine(lineStartX, lineStartY, height, side) {
    let level = this.levelManager.loadedLevel;

    if (side === 0) {
      this.context.fillStyle = level.COLORS.WALL_LIGHT;
    } else {
      this.context.fillStyle = level.COLORS.WALL_DARK;
    }

    this.context.fillRect(lineStartX, lineStartY, 1, height);

    if (CONFIG.DEBUGGING) {
      this.context.strokeStyle = level.COLORS.WALL_OUTLINE;
      this.context.strokeRect(lineStartX, lineStartY, 1, height);
    }
  }

  drawFpsCounter(frameTime) {
    if (this.lastFpsUpdateTime === 0 || this.lastFpsUpdateTime + 500 < this.time) {
      this.lastFpsUpdateTime = this.time;
      this.lastFpsCount = Math.floor(1 / frameTime);
    }

    let fpsCountText = `FPS: ${this.lastFpsCount}`;

    this.context.lineWidth = 4;

    this.context.lineWidth = 4;
    this.context.font = CONSTANTS.FPS_COUNTER_FONT;
    this.context.strokeStyle = PALETTE.BLACK;
    this.context.fillStyle = PALETTE.WHITE;
    this.context.strokeText(fpsCountText, 10, 30);
    this.context.fillText(fpsCountText, 10, 30);
  }

  drawEnemies() {
    let player = this.player;
    let enemies = this.levelManager.enemies;

    let canvasW = this.canvas.clientWidth;
    let canvasH = this.canvas.clientHeight;

    enemies.forEach((enemy) => {
      enemy.distance = ((player.posX - enemy.x) * (player.posX - enemy.x) + (player.posY - enemy.y) * (player.posY - enemy.y));
    });

    enemies.sort((a, b) => b.distance - a.distance);

    enemies.forEach((enemy) => {
      let enemyX = enemy.x - player.posX;
      let enemyY = enemy.y - player.posY;

      let invDet = 1.0 / (player.planeX * player.dirY - player.dirX * player.planeY);

      let transformX = invDet * (player.dirY * enemyX - player.dirX * enemyY);
      let transformY = invDet * (-player.planeY * enemyX + player.planeX * enemyY);

      let enemyScreenX = parseInt((canvasW / 2) * (1 + transformX / transformY));
      let enemyHeight = Math.abs(parseInt((canvasH / transformY)));
      let enemyWidth = enemyHeight / 2;

      let drawStartX = Math.floor(-enemyWidth / 2 + enemyScreenX);
      let drawStartY = Math.floor(-enemyHeight / 2 + canvasH / 2);

      let drawEndX = Math.floor(enemyWidth / 2 + enemyScreenX);

      let startStripe = -1;
      let endStripe = -1;

      for (let stripe = drawStartX; stripe < drawEndX; stripe++) {
        if (transformY > 0 && stripe > 0 && stripe < canvasW && transformY < this.zBuffer[stripe]) {
          startStripe = stripe;
          break;
        }
      }

      for (let stripe = drawEndX; stripe > drawStartX; stripe--) {
        if (transformY > 0 && stripe > 0 && stripe < canvasW && transformY < this.zBuffer[stripe]) {
          endStripe = stripe;
          break;
        }
      }

      let imageWidth = ((endStripe - startStripe) / (drawEndX - drawStartX));

      if (startStripe !== -1 && endStripe !== -1) {
        this.context.drawImage(enemy.texture, ((startStripe - drawStartX) / (drawEndX - drawStartX) * 64) + ((enemy.frame - 1) * 64), 0, imageWidth * 64, 128, startStripe, drawStartY, enemyWidth * imageWidth, enemyHeight);
      }
    });

    this.zBuffer = [];
  }

  drawJoystick() {
    let outer = this.joystick.outer;
    let inner = this.joystick.inner;
    let delta = this.joystick.delta;

    this.context.drawImage(outer.image, outer.x, outer.y, this.unit * 20, this.unit * 20);
    this.context.drawImage(inner.image, inner.x + delta.x, inner.y - delta.y, this.unit * 10, this.unit * 10);
  }

  onCanvasClick(event) {
    event.preventDefault();

    if (document.pointerLockElement === this.canvas) {
      return;
    }

    this.canvas.requestPointerLock();
  }

  onPointerLockChange() {
    if (document.pointerLockElement === this.canvas) {
      document.addEventListener("mousemove", this.player.updateDirection.bind(this.player));
    } else {
      document.removeEventListener("mousemove", this.player.updateDirection.bind(this.player));
    }

    this.togglePausePlay();
  }

  onWindowResize() {
    this.sizeCanvas();
    this.drawPauseScreen();
  }

  onTouchStart(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.state === CONFIG.GAME_STATES.ACTIVE) {
      let touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        if (i === 0 && touches[i].clientX <= this.canvas.width * 0.3) {
          this.joystick.outer.x = touches[i].clientX - this.unit * 10;
          this.joystick.outer.y = touches[i].clientY - this.unit * 10;
          this.joystick.inner.x = touches[i].clientX - this.unit * 5;
          this.joystick.inner.y = touches[i].clientY - this.unit * 5;
          this.joystick.active = true;
        } else if ((i === 1 && this.joystick.active) || touches[i].clientX > this.canvas.width * 0.3) {
          this.dirTouchX = touches[i].clientX;
        }
      }
    }
  }

  onTouchMove(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.state === CONFIG.GAME_STATES.ACTIVE) {
      let touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        if (i === 0 && this.joystick.active) {
          let newDeltaX = touches[i].clientX - (this.joystick.outer.x + this.unit * 10);
          let newDeltaY = (this.joystick.outer.y + this.unit * 10) - touches[i].clientY;

          if (newDeltaX > this.unit * 5) {
            newDeltaX = this.unit * 5;
          } else if (newDeltaX < -this.unit * 5) {
            newDeltaX = -this.unit * 5;
          }

          this.joystick.delta.x = newDeltaX;

          if (newDeltaY > this.unit * 5) {
            newDeltaY = this.unit * 5;
          } else if (newDeltaY < -this.unit * 5) {
            newDeltaY = -this.unit * 5;
          }

          this.joystick.delta.y = newDeltaY;
        } else if (i === 0 || (i === 1 && this.joystick.active)) {
          let movementX = touches[i].clientX - this.dirTouchX;
          this.dirTouchX = touches[i].clientX;
          this.player.updateDirection({ movementX });
        }
      }
    }
  }

  onTouchEnd(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.state !== CONFIG.GAME_STATES.ACTIVE) {
      this.togglePausePlay();
    } else {
      let touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        if (i === 0 && this.joystick.active) {
          this.joystick.active = false;
          this.joystick.delta.x = 0;
          this.joystick.delta.y = 0;
          this.player.forward = 0;
          this.player.sideways = 0;
        }
      }
    }
  }

  addGameEventListeners() {
    if (bowser.mobile || bowser.tablet) {
      document.addEventListener('touchstart', this.onTouchStart.bind(this));
      document.addEventListener('touchmove', this.onTouchMove.bind(this));
      document.addEventListener('touchend', this.onTouchEnd.bind(this));
    } else {
      this.canvas.addEventListener('click', this.onCanvasClick.bind(this));
      document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this));
    }

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  gameLoop() {
    let level = this.levelManager.loadedLevel;
    let player = this.player;

    this.drawFloorAndCeiling();

    let mapX, mapY, cameraX, rayDirX, rayDirY, deltaDistX, deltaDistY, stepX, stepY, sideDistX, sideDistY;
    let side, perpWallDist, lineHeight, lineStart, isWallHit;

    // Loop through every vertical line on the canvas
    for (let x = 0; x < this.canvas.width; x++) {
      // Save the square on the map the player is in
      mapX = Math.floor(player.posX);
      mapY = Math.floor(player.posY);

      // Find the position of the ray we are checking on the camera plane, from -1 to 1
      cameraX = 2 * x / this.canvas.width - 1;

      // Calculate ray vector
      rayDirX = player.dirX + player.planeX * cameraX;
      rayDirY = player.dirY + player.planeY * cameraX;

      // Distances required for ray to travel from one map square to the next
      deltaDistX = Math.sqrt(1 + (rayDirY * rayDirY) / (rayDirX * rayDirX));
      deltaDistY = Math.sqrt(1 + (rayDirX * rayDirX) / (rayDirY * rayDirY));

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

      isWallHit = false;

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

      this.zBuffer.push(perpWallDist);

      lineHeight = parseInt(this.canvas.height / perpWallDist);
      lineStart = Math.max((this.canvas.height - lineHeight) / 2, 0);

      this.drawLine(x, lineStart, lineHeight, side);
    }

    this.drawEnemies();

    this.oldTime = this.time;
    this.time = Date.now();

    this.handleNewFrame();
    this.handleStateUpdates();
  }
}

(new Game()).start();
