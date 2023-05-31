/* global Phaser */

// Copyright (c) 2023 Ben Thomson. All rights reserved.
//
// Created by: Ben Thomson
// Created on: 05/30/2023
// This is the Title Scene

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: "titleScene"})
  }

  init (data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    console.log("Title Scene")
  }

  create (data) {
  }

  update (time, delta) {
  }
}

export default TitleScene