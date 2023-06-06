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

    // Assigning null to game scene background image
    this.background = null

    // Assigning null to wizard image
    this.wizard = null

    // Initializing the fire missile variable as false
    this.fireMissile = false
  }

  init (data) {
    // Initializing game scene background colour
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    // Places Game Scene in the console to let programmer know the scene is being displayed
    console.log("Game Scene")

    // Giving Phaser the images for the background, the wizard and the missile
    this.load.image("mountainBackground", "images/gameSceneImage.png")
    this.load.image("wizard", "images/wizard.png")
    this.load.image("missile", "images/magicMissile.png")
  }

  create (data) {
    // Displaying the game scene background image
    this.background = this.add.image(0, 0, "mountainBackground").setScale(1.0)
    this.background.setOrigin(0, 0)

    // Creating the wizard sprite on the screen
    this.wizard = this.physics.add.sprite(1920 / 2, 1080 - 100, "wizard").setScale(0.35)

    // Creating a group for the same code to apply to all the missiles
    this.missileGroup = this.physics.add.group()
  }

  update (time, delta) {
    // Allowing computer keys to control movement of the wizard and firing of missiles
    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyRightObj = this.input.keyboard.addKey("RIGHT")
    const keySpaceObj = this.input.keyboard.addKey("SPACE")

    // If the left arrow is pressed, move the wizard to the left
    if (keyLeftObj.isDown === true) {
      this.wizard.x -= 15

      // Wrapping the wizard to the other side of the screen when it is moved off the right of the screen
      if (this.wizard.x < 0) {
        this.wizard.x = 1920;
      }
    }

    // If the right arrow is pressed, move the wizard to the right
    if (keyRightObj.isDown === true) {
      this.wizard.x += 15

      // Wrapping the wizard to the other side of the screen when it is moved off the left of the screen
      if (this.wizard.x > 1920) {
        this.wizard.x = 0;
      }
    }

    /// If the spacebar is pressed, fire a missile
    if (keySpaceObj.isDown === true) {

      // Checking if a missile has been fired when the space bar was pressed
      if (this.fireMissile === false) {
        // Changing the fire missile variable to true, indicating that a missile has been fired
        this.fireMissile = true

        // Displaying a new missile that will appear on the screen
        const aNewMissile = this.physics.add.sprite(this.wizard.x - 40, this.wizard.y - 90, "missile").setScale(0.20)

        // Adding the new missile to the group of missiles in the "create" section
        this.missileGroup.add(aNewMissile)
      }
    }

    // If the spacebar is not pressed, reset the fire missile variable to false so another can be fired
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }
  }
}

// Exporting the game scene as default
export default GameScene