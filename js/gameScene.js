/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Ben Thomson
// Created on: 06/05/2023
// This is the Game Scene

// The code written below adds to the code already in Phaser.Scene
class GameScene extends Phaser.Scene {
  constructor () {

    // Using the "gameScene" key to create an object
    super({ key: "gameScene"})
  }

  init (data) {
    // Initializing title scene background colour
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    // Places Game Scene in the console to let programmer know the scene is being displayed
    console.log("Game Scene")
  }

  create (data) {
  }

  update (time, delta) {
  }
}

// Exporting the menu scene as default
export default GameScene