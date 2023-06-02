/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Ben Thomson
// Created on: 05/30/2023
// This is the Phaser3 configuration file

// Import SplashScene class from ./splashScene.js
import SplashScene from "./splashScene.js"

// Import SplashScene class from ./titleScene.js
import TitleScene from "./titleScene.js"

// Creating objects of scenes for managing different scenes in the program
const splashScene = new SplashScene()
const titleScene = new TitleScene()


// Creating a constant to detail the basic Phaser game
const  config = {
  // Type of game
  type: Phaser.AUTO,

  // Dimensions of the screen
  width: 1920,
  height: 1080,

  // Allowing default arcade game to be played
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  
  // Setting background color
  backgroundColor: 0xffffff,

  // Allowing scale of background to change
  scale: {
    mode: Phaser.Scale.FIT,
    
    // Placing the background in the center of the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

// Creating a new Phaser game with config details
const game = new Phaser.Game(config)

// Loading the different scenes
game.scene.add("splashScene", splashScene)
game.scene.add("titleScene", titleScene)


// Starting the splash scene
game.scene.start("splashScene")