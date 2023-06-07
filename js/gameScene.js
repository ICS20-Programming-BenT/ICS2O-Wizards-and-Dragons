/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Ben Thomson
// Created on: 06/05/2023
// This is the Game Scene

// The code written below adds to the code already in Phaser.Scene
class GameScene extends Phaser.Scene {

  // Create a dragon
  createDragon() {
    // Creating enemies at a random x location between 1 and 1920 px
    const dragonXLocation = Math.floor(Math.random() * 1920) +1

    // Using a variable and Math.random() to make the dragons less predictable
    let dragonXVelocity = Math.floor(Math.random() * 50) + 1

    // Making the dragons move slightly up or down
    dragonXVelocity *= Math.round(Math.random()) ? 1 : -1

    // Creating a variable that makes a dragon appear each time this function is called
    const aDragon = this.physics.add.sprite(dragonXLocation, -100, "dragon").setScale(0.20)

    // Adding an y velocity to the dragon
    aDragon.body.velocity.y = 200

    // Adding the x velocity using the variable defined above
    aDragon.body.velocity.x = dragonXVelocity

    // Adding the new dragon created to the dragon group
    this.dragonGroup.add(aDragon)
  }
  
  constructor () {

    // Using the "gameScene" key to create an object
    super({ key: "gameScene"})

    // Assigning null to game scene background image
    this.background = null

    // Assigning null to wizard image
    this.wizard = null

    // Initializing the fire missile variable as false
    this.fireMissile = false

    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: "65px Georgia", fill: "#48bfe3", align: "center"}

    this.gameOverText = null
    this.gameOverTextStyle = { font: "65px Georgia", fill: "#5a189a", align: "center"}
  }

  init (data) {
    // Initializing game scene background colour
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    // Places Game Scene in the console to let programmer know the scene is being displayed
    console.log("Game Scene")

    // Giving Phaser the images for the background, the wizard, the missile and the dragon 
    this.load.image("mountainBackground", "images/gameSceneImage.png")
    this.load.image("wizard", "images/wizard.png")
    this.load.image("missile", "images/magicMissile.png")
    this.load.image("dragon", "images/dragon.png")

    // Loading the various sound effects for the game
    this.load.audio("spell", "./sounds/spell-sound-effect.wav")
    this.load.audio("explosion", "./sounds/explosion-sound-effect.wav")
    this.load.audio("gameOver", "./sounds/game-over.wav")
  }

  create (data) {
    // Displaying the game scene background image
    this.background = this.add.image(0, 0, "mountainBackground").setScale(1.0)
    this.background.setOrigin(0, 0)

    // Displaying styled score text
    this.scoreText = this.add.text(10, 10, "Score: " + this.score.toString(), this.scoreTextStyle)

    // Creating the wizard sprite on the screen
    this.wizard = this.physics.add.sprite(1920 / 2, 1080 - 100, "wizard").setScale(0.35)

    // Creating a group for the same code to apply to all the missiles
    this.missileGroup = this.physics.add.group()

    // Creating a group for the same code to apply to all the dragons
    this.dragonGroup = this.add.group()
    this.createDragon()

    // Adding a physics collider so that when missiles hit dragons, a function is called
    this.physics.add.collider(this.missileGroup, this.dragonGroup, function (missileCollide, dragonCollide) {
      // Destroying the dragon upon collision
      dragonCollide.destroy()
      
      // Destroying the missile upon collision
      missileCollide.destroy()

      // Playing the explosion sound effect
      this.sound.play("explosion")

       // Updating score upon explosion of dragon
      this.score += 1
      this.scoreText.setText("Score: " + this.score.toString())

      // Recreating two new dragons for each that is destroyed
      this.createDragon()
      this.createDragon()

      // Binding above code to the class created at the top of the file
    }.bind(this))

    // Adding a physics collider so that when a dragon hits the wizard, a function is called
    this.physics.add.collider(this.wizard, this.dragonGroup, function (wizardCollide, dragonCollide) {
      // Playing the game over sound effect
      this.sound.play("gameOver")

      // Pausing the physics
      this.physics.pause()

      // Destroying both the dragons and the wizard
      dragonCollide.destroy()
      wizardCollide.destroy()

      // Displaying the game over text and allowing the user to click on it to start over
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, "Game Over!\nClick to play again.", this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true})
      this.gameOverText.on("pointerdown", () => this.scene.start("gameScene"))
    }.bind(this))
  }

  update (time, delta) {
    // Allowing computer keys to control movement of the wizard and firing of missiles
    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyRightObj = this.input.keyboard.addKey("RIGHT")
    const keySpaceObj = this.input.keyboard.addKey("SPACE")

    // If the left arrow is pressed, move the wizard to the left
    if (keyLeftObj.isDown === true) {
      this.wizard.x -= 15

      // Wrapping the wizard to the other side of the screen when it is moved off the left of the screen
      if (this.wizard.x < 0) {
        this.wizard.x = 1920;
      }
    }

    // If the right arrow is pressed, move the wizard to the right
    if (keyRightObj.isDown === true) {
      this.wizard.x += 15

      // Wrapping the wizard to the other side of the screen when it is moved off the right of the screen
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

        // Playing the sound of the spell being fired
        this.sound.play("spell")
      }
    }

    // If the spacebar is not pressed, reset the fire missile variable to false so another can be fired
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }

    // To make missiles move up the screen
    this.missileGroup.children.each(function (item) {
      item.y -= 15
      if (item.y < 0) {
        item.destroy()
      }
    })
  }
}

// Exporting the game scene as default
export default GameScene