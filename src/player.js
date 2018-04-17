import { MOVEMENT_MULTIPLIER } from './config.js';

export default class Player {
  constructor() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    this.posX = 0;
    this.posY = 0;

    this.dirX = 0;
    this.dirY = 0;

    this.planeX = 0;
    this.planeY = 0;
  }

  updatePosition(level, frameTime) {
    if (!this.up && !this.down && !this.left && !this.right) {
      return;
    }

    let moveSpeed = frameTime * MOVEMENT_MULTIPLIER;

    if (this.up) {
      let x = Math.floor(this.posX + this.dirX * moveSpeed);
      let y = Math.floor(this.posY);

      if (level.MAP[x][y] === 0) {
        this.posX += this.dirX * moveSpeed;
      }

      x = Math.floor(this.posX);
      y = Math.floor(this.posY + this.dirY * moveSpeed);

      if (level.MAP[x][y] === 0) {
        this.posY += this.dirY * moveSpeed;
      }
    }

    if (this.down) {
      let x = Math.floor(this.posX - this.dirX * moveSpeed);
      let y = Math.floor(this.posY);

      if (level.MAP[x][y] === 0) {
        this.posX -= this.dirX * moveSpeed;
      }

      x = Math.floor(this.posX);
      y = Math.floor(this.posY - this.dirY * moveSpeed);

      if (level.MAP[x][y] === 0) {
        this.posY -= this.dirY * moveSpeed;
      }
    }

    if (this.left) {
      let x = Math.floor(this.posX - this.dirY * moveSpeed);
      let y = Math.floor(this.posY);

      if (level.MAP[x][y] === 0) {
        this.posX -= this.dirY * moveSpeed;
      }

      x = Math.floor(this.posX);
      y = Math.floor(this.posY + this.dirX * moveSpeed);

      if (level.MAP[x][y] === 0) {
        this.posY += this.dirX * moveSpeed;
      }
    }

    if (this.right) {
      let x = Math.floor(this.posX + this.dirY * moveSpeed);
      let y = Math.floor(this.posY);

      if (level.MAP[x][y] === 0) {
        this.posX += this.dirY * moveSpeed;
      }

      x = Math.floor(this.posX);
      y = Math.floor(this.posY - this.dirX * moveSpeed);

      if (level.MAP[x][y] === 0) {
        this.posY -= this.dirX * moveSpeed;
      }
    }
  }

  updateDirection(mouseMoveEvent) {
    let rotSpeed = (mouseMoveEvent.movementX / 100);

    let oldDirX = this.dirX;
    let oldPlaneX = this.planeX;

    let rotSpeedSin = Math.sin(-rotSpeed);
    let rotSpeedCos = Math.cos(-rotSpeed);

    this.dirX = this.dirX * rotSpeedCos - this.dirY * rotSpeedSin;
    this.dirY = oldDirX * rotSpeedSin + this.dirY * rotSpeedCos;

    this.planeX = this.planeX * rotSpeedCos - this.planeY * rotSpeedSin;
    this.planeY = oldPlaneX * rotSpeedSin + this.planeY * rotSpeedCos;
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 65:
        this.left = true;
        event.preventDefault();
        event.stopPropagation();
        break;
      case 68:
        this.right = true;
        event.preventDefault();
        event.stopPropagation();
        break;
      case 87:
        this.up = true;
        event.preventDefault();
        event.stopPropagation();
        break;
      case 83:
        this.down = true;
        event.preventDefault();
        event.stopPropagation();
        break;
    }
  }

  handleKeyUp(event) {
    switch (event.keyCode) {
      case 65:
        this.left = false;
        event.preventDefault();
        event.stopPropagation();
        break;
      case 68:
        this.right = false;
        event.preventDefault();
        event.stopPropagation();
        break;
      case 87:
        this.up = false;
        event.preventDefault();
        event.stopPropagation();
        break;
      case 83:
        this.down = false;
        event.preventDefault();
        event.stopPropagation();
        break;
    }
  }

  addPlayerControlListeners() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  removePlayerControlListeners() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('keyup', this.handleKeyUp.bind(this));
  }
}
