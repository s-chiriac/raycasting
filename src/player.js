import { MULTIPLIERS } from './config.js';

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

    this.addPlayerControlListeners();
  }

  updatePosition(level, frameTime) {
    if (!this.up && !this.down) {
      return;
    }

    let moveSpeed = frameTime * MULTIPLIERS.MOVEMENT;

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
  }

  updateDirection(frameTime) {
    if (!this.left && !this.right) {
      return;
    }

    let rotSpeed = frameTime * MULTIPLIERS.ROTATION;

    let oldDirX = this.dirX;
    let oldPlaneX = this.planeX;

    if (this.left) {
      let rotSpeedSin = Math.sin(rotSpeed);
      let rotSpeedCos = Math.cos(rotSpeed);

      this.dirX = this.dirX * rotSpeedCos - this.dirY * rotSpeedSin;
      this.dirY = oldDirX * rotSpeedSin + this.dirY * rotSpeedCos;

      this.planeX = this.planeX * rotSpeedCos - this.planeY * rotSpeedSin;
      this.planeY = oldPlaneX * rotSpeedSin + this.planeY * rotSpeedCos;
    }

    if (this.right) {
      let rotSpeedSin = Math.sin(-rotSpeed);
      let rotSpeedCos = Math.cos(-rotSpeed);

      this.dirX = this.dirX * rotSpeedCos - this.dirY * rotSpeedSin;
      this.dirY = oldDirX * rotSpeedSin + this.dirY * rotSpeedCos;

      this.planeX = this.planeX * rotSpeedCos - this.planeY * rotSpeedSin;
      this.planeY = oldPlaneX * rotSpeedSin + this.planeY * rotSpeedCos;
    }
  }

  addPlayerControlListeners() {
    document.addEventListener('keydown', (event) => {
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
    });

    document.addEventListener('keyup', (event) => {
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
    });
  }
}
