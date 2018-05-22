import Sprite from './sprite.js';

export default class Enemy extends Sprite {
  constructor(x, y, texture, width, height) {
    super(x, y, texture);

    this.width = width;
    this.height = height;
    this.distance = 0;

    this.totalFrames = 9;
    this.frame = 1;

    setInterval(this.nextFrame.bind(this), 200);
  }

  nextFrame() {
    if (this.frame < this.totalFrames) {
      this.frame ++;
    } else {
      this.frame = 1;
    }
  }
}
