/* global Phaser */

// Copyright (c) 2023 Ben Thomson. All rights reserved.
//
// Created by: Ben Thomson
// Created on: 05/30/2023
// This is the Splash Scene

class SplashScene extends Phaser.Scene {
  constructor () {
    super({ key: "splashScene"})
  }

  init (data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    console.log("Splash Scene")
  }

  create (data) {
  }

  update (time, delta) {
    this.scene.switch("titleScene")
  }
}

export default SplashScene