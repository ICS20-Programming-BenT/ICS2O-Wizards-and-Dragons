/* global Phaser */

// Copyright (c) 2023 Ben Thomson. All rights reserved.
//
// Created by: Ben Thomson
// Created on: 05/30/2023
// This is the Phaser3 configuration file

import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"

// Our game scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()


//* Game scene */
const  config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  // Set background color
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    // We place it in the middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)

// Load scenes
// NOTE: remember any "key" is global and CAN NOT be reused
game.scene.add("splashScene", splashScene)
game.scene.add("titleScene", titleScene)


// Start title
game.scene.start("splashScene")