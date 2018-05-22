export default class Sprite {
  constructor(x, y, texture) {
    this.x = x;
    this.y = y;
    this.texture = new Image();
    this.texture.src = texture;
  }
}
