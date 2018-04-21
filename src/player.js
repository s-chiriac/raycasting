import { MOVEMENT_MULTIPLIER } from './config.js';

export default class Player {
  constructor() {
    this.forward = 0;
    this.sideways = 0;

    this.posX = 0;
    this.posY = 0;

    this.dirX = 0;
    this.dirY = 0;

    this.planeX = 0;
    this.planeY = 0;
  }

  updatePosition(level, frameTime) {
    if (this.forward === 0 && this.sideways === 0) {
      return;
    }

    let moveSpeed = frameTime * MOVEMENT_MULTIPLIER;

    if (this.forward !== 0) {
      let x = Math.floor(this.posX + this.dirX * moveSpeed * this.forward);
      let y = Math.floor(this.posY);

      if (level.MAP[x][y] === 0) {
        this.posX += this.dirX * moveSpeed * this.forward;
      }

      x = Math.floor(this.posX);
      y = Math.floor(this.posY + this.dirY * moveSpeed * this.forward);

      if (level.MAP[x][y] === 0) {
        this.posY += this.dirY * moveSpeed * this.forward;
      }
    }

    if (this.sideways !== 0) {
      let x = Math.floor(this.posX + this.dirY * moveSpeed * this.sideways);
      let y = Math.floor(this.posY);

      if (level.MAP[x][y] === 0) {
        this.posX += this.dirY * moveSpeed * this.sideways;
      }

      x = Math.floor(this.posX);
      y = Math.floor(this.posY - this.dirX * moveSpeed * this.sideways);

      if (level.MAP[x][y] === 0) {
        this.posY -= this.dirX * moveSpeed * this.sideways;
      }
    }
  }

  updateDirection(mouseMoveEvent) {
    let rotSpeed = (mouseMoveEvent.movementX / 300);

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
        this.sideways = -1;
        event.preventDefault();
        event.stopPropagation();
        break;
      case 68:
        this.sideways = 1;
        event.preventDefault();
        event.stopPropagation();
        break;
      case 87:
        this.forward = 1;
        event.preventDefault();
        event.stopPropagation();
        break;
      case 83:
        this.forward = -1;
        event.preventDefault();
        event.stopPropagation();
        break;
    }
  }

  handleKeyUp(event) {
    switch (event.keyCode) {
      case 65:
      case 68:
        this.sideways = 0;
        event.preventDefault();
        event.stopPropagation();
        break;
      case 83:
      case 87:
        this.forward = 0;
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
