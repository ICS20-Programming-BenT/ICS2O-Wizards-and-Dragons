/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Ben Thomson
// Created on: 06/05/2023
// This is the Menu Scene

// This class is the Menu Scene
class MenuScene extends Phaser.Scene {
  constructor () {

    // Using the "menuScene" key to create an object
    super({ key: "menuScene"})

    // Constructing menu scene background image
    this.menuSceneBackgroundImage = null
    
    // Constructing starting button
    this.startButton = null

    // Constructing instructions button
    this.instructionsButton = null
  }

  init (data) {
    // Initializing menu scene background colour
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    // Places Menu Scene in the console to let programmer know the scene is being displayed
    console.log("Menu Scene")

    // Loading in background image
    this.load.image("menuSceneBackground", "./images/menuSceneImage.png")

    // Loading in starting button
    this.load.image("startButton", "./images/startButton.png")
    
    // Loading in instructions button
    this.load.image("instructionsButton", "./images/instructionsButton.png")
  }

  create (data) {
    // Displaying the menu scene background image (must be scaled to fit the screen)
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, "menuSceneBackground").setScale(1.7)

    // Initializing the position of the image on the screen
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

     // Placing starting button into the scene using coordinates
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 50, "startButton")

    // Making start button interactive (responsive to user's click)
    this.startButton.setInteractive({ useHandCursor: true })

    // When start button is clicked, call a function that will move on to the game scene
    this.startButton.on("pointerdown", () => this.clickButton())

    // Placing instructions button into the scene using coordinates
    this.instructionsButton = this.add.sprite(1920 / 2, (1080 / 2) + 340, "instructionsButton").setScale(0.7)
    
    // Making instructions button interactive (responsive to user's click)
    this.instructionsButton.setInteractive({ useHandCursor: true })
    
    // Creating a function for when the instructions button is clicked
    this.instructionsButton.on("pointerdown", () => this.instructionsClicked())
  }

  update (time, delta) {
  }

  // Function for when start button is clicked
  clickButton () {
    this.scene.start("gameScene")
  }

  // Function for when instructions button is clicked
  instructionsClicked() {
    this.scene.start("instructionsScene")
  }
}

// Exporting the menu scene as default
export default MenuScene