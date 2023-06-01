/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Ben Thomson
// Created on: 05/30/2023
// This is the Title Scene

// The code written below adds to the code already in Phaser.Scene
class TitleScene extends Phaser.Scene {
  constructor () {

    // Using the "splashScene" key to create an object
    super({ key: "titleScene"})
  }

  init (data) {
    // Initializing title scene background colour
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    // Places Title Scene in the console to let programmer know the scene is being displayed
    console.log("Title Scene")
  }

  create (data) {
  }

  update (time, delta) {
  }
}

// Exporting the title scene as default
export default TitleScene