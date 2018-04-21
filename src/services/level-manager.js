import LEVEL_1 from '../../levels/level1.js';

const LEVEL_LIST = [ LEVEL_1 ];

export default class LevelManager {
  constructor() {
    this.loadedLevel = null;
    this.currentLevelNumber = 0;
  }

  loadNextLevel() {
    this.loadLevel(this.currentLevelNumber + 1);
  }

  loadLevel(levelNumber) {
    if (levelNumber > LEVEL_LIST.length) {
      levelNumber = LEVEL_LIST.length;
    }

    this.loadedLevel = LEVEL_LIST[levelNumber - 1];
    this.currentLevelNumber = levelNumber;
  }
}
