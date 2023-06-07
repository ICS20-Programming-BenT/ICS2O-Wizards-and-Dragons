/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Ben Thomson
// Created on: 05/30/2023
// This is the Title Scene

// This class is the Title Scene
class TitleScene extends Phaser.Scene {
  constructor () {

    // Using the "titleScene" key to create an object
    super({ key: "titleScene"})
    
    // Assigning null to title scene background image and title scene text
    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    
    // Styling for the title scene text
    this.titleSceneTextStyle = {font: "135px Georgia", fill: "#5a189a", align: "center"}
  }

  init (data) {
    // Initializing title scene background colour
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    // Places Title Scene in the console to let programmer know the scene is being displayed
    console.log("Title Scene")

    // Giving Phaser the chosen image for the title scene
    this.load.image("titleSceneBackground", "./images/titleSceneImage.png")
  }

  create (data) {
    // Displaying the title scene background image
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, "titleSceneBackground").setScale(1)

    // Initializing the position of the image on the screen
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2

    // Adding the title scene text
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 250, "Wizards and Dragons", this.titleSceneTextStyle).setOrigin(0.5, 2.5)

    // Adding a fade-in animation to the above text (method learned from https://rexrainbow.github.io/phaser3-rex-notes/docs/site/tween/)
    this.tweens.add({
      targets: this.titleSceneText,
      alpha: { from: 0, to: 1 },
      duration: 2000,
    });
  }

  update (time, delta) {
     // Setting the amount of time during which this scene is shown (4 seconds, 8 seconds after start of game)
    if (time > 8000) {
      
      // Moving on to the menu scene
      this.scene.switch("menuScene")
    }
  }
}

// Exporting the title scene as default
export default TitleScene