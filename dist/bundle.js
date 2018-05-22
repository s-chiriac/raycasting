/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const BLACK = 'rgb(0, 0, 0)';
const GREY = 'rgb(48, 48, 48)';
const WHITE = 'rgb(255, 255, 255)';

const BLUE = 'rgb(0, 0, 255)';
const DARK_BLUE = 'rgb(0, 0, 200)';

const TRANSPARENT_BLACK = 'rgba(0, 0, 0, 0.7)';

const PALETTE = {
  BLACK,
  GREY,
  WHITE,
  BLUE,
  DARK_BLUE,
  TRANSPARENT_BLACK,
};

/* harmony default export */ __webpack_exports__["a"] = (PALETTE);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// CONTROLS
const JOYSTICK = {
  OUTER: 'assets/controls/joystick_outer.png',
  INNER: 'assets/controls/joystick_inner.png',
};

// ENEMIES
const MOBSTER = {
  MOVING: 'assets/enemies/mobster/mobster.png',
  SHOOTING: 'assets/enemies/mobster/mobster_shooting.png',
  WIDTH: 64,
  HEIGHT: 128,
};

const TEXTURES = { JOYSTICK, MOBSTER };

/* harmony default export */ __webpack_exports__["a"] = (TEXTURES);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const GAME_STATES = {
  MENU: 'MENU',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
};

const MOVEMENT_MULTIPLIER = 3;
/* harmony export (immutable) */ __webpack_exports__["a"] = MOVEMENT_MULTIPLIER;


const DEBUGGING = false;

const CONFIG = { GAME_STATES, MOVEMENT_MULTIPLIER, DEBUGGING };

/* harmony default export */ __webpack_exports__["b"] = (CONFIG);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bowser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bowser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bowser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__palette_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__textures_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__player_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_level_manager_js__ = __webpack_require__(8);










class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    this.zBuffer = [];

    this.state = __WEBPACK_IMPORTED_MODULE_4__config_js__["b" /* default */].GAME_STATES.MENU;
    this.dirTouchX = 0;

    this.lastFpsUpdateTime = 0;
    this.lastFpsCount = 0;

    this.time = 0;
    this.oldTime = 0;

    this.player = new __WEBPACK_IMPORTED_MODULE_5__player_js__["a" /* default */]();
    this.levelManager = new __WEBPACK_IMPORTED_MODULE_6__services_level_manager_js__["a" /* default */]();

    if (__WEBPACK_IMPORTED_MODULE_0_bowser___default.a.mobile || __WEBPACK_IMPORTED_MODULE_0_bowser___default.a.tablet) {
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

    outerJoystick.src = __WEBPACK_IMPORTED_MODULE_3__textures_js__["a" /* default */].JOYSTICK.OUTER;
    innerJoystick.src = __WEBPACK_IMPORTED_MODULE_3__textures_js__["a" /* default */].JOYSTICK.INNER;

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
    if (this.state === __WEBPACK_IMPORTED_MODULE_4__config_js__["b" /* default */].GAME_STATES.ACTIVE) {
      this.state = __WEBPACK_IMPORTED_MODULE_4__config_js__["b" /* default */].GAME_STATES.PAUSED;
    } else {
      this.state = __WEBPACK_IMPORTED_MODULE_4__config_js__["b" /* default */].GAME_STATES.ACTIVE;
      this.player.addPlayerControlListeners();
      this.gameLoop();
    }
  }

  handleNewFrame() {
    let frameTime = (this.time - this.oldTime) / 1000;

    this.drawFpsCounter(frameTime);

    if (__WEBPACK_IMPORTED_MODULE_0_bowser___default.a.mobile || __WEBPACK_IMPORTED_MODULE_0_bowser___default.a.tablet) {
      if (this.joystick.active) {
        this.drawJoystick();
        this.player.forward = this.joystick.delta.y / (this.unit * 5);
        this.player.sideways = this.joystick.delta.x / (this.unit * 5);
      }
    }

    this.player.updatePosition(this.levelManager.loadedLevel, frameTime);
  }

  handleStateUpdates() {
    if (this.state === __WEBPACK_IMPORTED_MODULE_4__config_js__["b" /* default */].GAME_STATES.ACTIVE) {
      requestAnimationFrame(this.gameLoop.bind(this));
    } else {
      this.player.removePlayerControlListeners();
      this.drawPauseScreen();
    }
  }

  drawPauseScreen() {
    this.context.fillStyle = __WEBPACK_IMPORTED_MODULE_2__palette_js__["a" /* default */].TRANSPARENT_BLACK;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = __WEBPACK_IMPORTED_MODULE_2__palette_js__["a" /* default */].WHITE;
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

    if (__WEBPACK_IMPORTED_MODULE_4__config_js__["b" /* default */].DEBUGGING) {
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
    this.context.font = __WEBPACK_IMPORTED_MODULE_1__constants_js__["a" /* default */].FPS_COUNTER_FONT;
    this.context.strokeStyle = __WEBPACK_IMPORTED_MODULE_2__palette_js__["a" /* default */].BLACK;
    this.context.fillStyle = __WEBPACK_IMPORTED_MODULE_2__palette_js__["a" /* default */].WHITE;
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

    if (this.state === __WEBPACK_IMPORTED_MODULE_4__config_js__["b" /* default */].GAME_STATES.ACTIVE) {
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

    if (this.state === __WEBPACK_IMPORTED_MODULE_4__config_js__["b" /* default */].GAME_STATES.ACTIVE) {
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

    if (this.state !== __WEBPACK_IMPORTED_MODULE_4__config_js__["b" /* default */].GAME_STATES.ACTIVE) {
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
    if (__WEBPACK_IMPORTED_MODULE_0_bowser___default.a.mobile || __WEBPACK_IMPORTED_MODULE_0_bowser___default.a.tablet) {
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (true) __webpack_require__(5)(name, definition)
  else root[name] = definition()
}(this, 'bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getSecondMatch(/edg([ea]|ios)\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua) && !/tablet pc/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    } else if (/opr\/|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , osname: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , osname: 'Chrome OS'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/edg([ea]|ios)/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , osname: 'Sailfish OS'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
        result.osname = 'Firefox OS'
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , osname: 'BlackBerry OS'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , osname: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , osname: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , osname: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && (android || result.silk)) {
      result.android = t
      result.osname = 'Android'
    } else if (!result.windowsphone && iosdevice) {
      result[iosdevice] = t
      result.ios = t
      result.osname = 'iOS'
    } else if (mac) {
      result.mac = t
      result.osname = 'macOS'
    } else if (xbox) {
      result.xbox = t
      result.osname = 'Xbox'
    } else if (windows) {
      result.windows = t
      result.osname = 'Windows'
    } else if (linux) {
      result.linux = t
      result.osname = 'Linux'
    }

    function getWindowsVersion (s) {
      switch (s) {
        case 'NT': return 'NT'
        case 'XP': return 'XP'
        case 'NT 5.0': return '2000'
        case 'NT 5.1': return 'XP'
        case 'NT 5.2': return '2003'
        case 'NT 6.0': return 'Vista'
        case 'NT 6.1': return '7'
        case 'NT 6.2': return '8'
        case 'NT 6.3': return '8.1'
        case 'NT 10.0': return '10'
        default: return undefined
      }
    }

    // OS version extraction
    var osVersion = '';
    if (result.windows) {
      osVersion = getWindowsVersion(getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i))
    } else if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (result.mac) {
      osVersion = getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = !result.windows && osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  /*
   * Set our detect public method to the main bowser object
   * This is needed to implement bowser in server side
   */
  bowser.detect = detect;
  return bowser
});


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const FPS_COUNTER_FONT = '500 20px sans-serif';

const CONSTANTS = { FPS_COUNTER_FONT };

/* harmony default export */ __webpack_exports__["a"] = (CONSTANTS);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(2);


class Player {
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

    let moveSpeed = frameTime * __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* MOVEMENT_MULTIPLIER */];

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
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__levels_level1_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemy_js__ = __webpack_require__(10);



const LEVEL_LIST = [ __WEBPACK_IMPORTED_MODULE_0__levels_level1_js__["a" /* default */] ];

class LevelManager {
  constructor() {
    this.loadedLevel = null;
    this.currentLevelNumber = 0;
    this.enemies = [];
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

    this.loadEnemies();
  }

  loadEnemies() {
    this.loadedLevel.ENEMIES.forEach((enemy) => {
      this.enemies.push(new __WEBPACK_IMPORTED_MODULE_1__enemy_js__["a" /* default */](enemy.X, enemy.Y, enemy.TEXTURE.SHOOTING, enemy.WIDTH, enemy.HEIGHT));
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LevelManager;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_palette_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_textures_js__ = __webpack_require__(1);



const MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const STARTING_POSITION = {
  X: 12,
  Y: 11,
};

const STARTING_DIRECTION = {
  X: 0,
  Y: -1,
};

const STARTING_CAMERA = {
  X: -0.85,
  Y: 0,
};

const COLORS = {
  CEILING: __WEBPACK_IMPORTED_MODULE_0__src_palette_js__["a" /* default */].BLACK,
  FLOOR: __WEBPACK_IMPORTED_MODULE_0__src_palette_js__["a" /* default */].GREY,
  WALL_LIGHT: __WEBPACK_IMPORTED_MODULE_0__src_palette_js__["a" /* default */].BLUE,
  WALL_DARK: __WEBPACK_IMPORTED_MODULE_0__src_palette_js__["a" /* default */].DARK_BLUE,

  WALL_OUTLINE: __WEBPACK_IMPORTED_MODULE_0__src_palette_js__["a" /* default */].WHITE,
};

const ENEMIES = [
  {
    X: 12,
    Y: 10,
    TEXTURE: __WEBPACK_IMPORTED_MODULE_1__src_textures_js__["a" /* default */].MOBSTER,
    WIDTH: __WEBPACK_IMPORTED_MODULE_1__src_textures_js__["a" /* default */].MOBSTER.WIDTH,
    HEIGHT: __WEBPACK_IMPORTED_MODULE_1__src_textures_js__["a" /* default */].MOBSTER.HEIGHT,
  }
];

const LEVEL_1 = { MAP, STARTING_POSITION, STARTING_DIRECTION, STARTING_CAMERA, COLORS, ENEMIES };

/* harmony default export */ __webpack_exports__["a"] = (LEVEL_1);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite_js__ = __webpack_require__(11);


class Enemy extends __WEBPACK_IMPORTED_MODULE_0__sprite_js__["a" /* default */] {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sprite {
  constructor(x, y, texture) {
    this.x = x;
    this.y = y;
    this.texture = new Image();
    this.texture.src = texture;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sprite;



/***/ })
/******/ ]);