/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Ben Thomson
// Created on: 06/05/2023
// This is the Menu Scene

// The code written below adds to the code already in Phaser.Scene
class MenuScene extends Phaser.Scene {
  constructor () {

    // Using the "menuScene" key to create an object
    super({ key: "menuScene"})

    // Assigning null to menu scene background image
    this.menuSceneBackgroundImage = null
    
    // Assigning null to starting button
    this.startButton = null
  }

  init (data) {
    // Initializing menu scene background colour
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    // Places Menu Scene in the console to let programmer know the scene is being displayed
    console.log("Menu Scene")

    // Giving Phaser the chosen images for background and start button
    this.load.image("menuSceneBackground", "./images/menuSceneImage.png")
    this.load.image("startButton", "./images/startButton.png")
  }

  create (data) {
    // Displaying the menu scene background image (must be scaled to fit the screen)
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, "menuSceneBackground").setScale(1.7)

    // Initializing the position of the image on the screen
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

     // Displaying image for start button
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 50, "startButton")

    // Making start button interactive (responsive to user's click)
    this.startButton.setInteractive({ useHandCursor: true })

    // When start button is clicked, call a function that will move on to the game scene
    this.startButton.on("pointerdown", () => this.clickButton())
  }

  update (time, delta) {
  }

  // Function for when start button is clicked
  clickButton () {
    this.scene.start("gameScene")
  }
}

// Exporting the menu scene as default
export default MenuScene