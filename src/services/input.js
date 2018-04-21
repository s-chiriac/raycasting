import bowser from 'bowser';

export default class Input {
  static addGameControls(game) {
    if (bowser.mobile || bowser.tablet) {
      Input.addMobileGameControls(game);
    } else {
      Input.addDesktopGameControls(game);
    }
  }

  static addMobileGameControls() {

  }

  static addDesktopGameControls(game) {
    game.canvas.addEventListener('click', this.onCanvasClick.bind(this));
    document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this));
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  static removeGameControls() {

  }

  static addPlayerControls() {

  }

  static removePlayerControls() {

  }

  static handlePlayerMovement(player, event) {

  }

  static handlePlayerDirection(player, event) {

  }
}
