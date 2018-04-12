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
