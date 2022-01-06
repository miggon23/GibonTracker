import Living from "./living.js";
export default class Player extends Living{

  /**
   * Constructor del player
   * @param {*} scene La escena
   * @param {*} x Coor x
   * @param {*} y Coor y
   */
  constructor(scene, x, y){
    super(scene, x, y, 'box');
    this.displayHeight = 60;
    this.displayWidth = 60;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setDepth(3);
    this.setPlayerSpeed();
    this.setTint('0xe2e2e2');
  
    //Ajustes del collider
    this.body.setOffset(30, 50);
    this.body.setSize(this.displayWidth * 0.55, this.displayHeight * 0.8, false);
    
    this.w = this.scene.input.keyboard.addKey('W');
    this.a = this.scene.input.keyboard.addKey('A');
    this.s = this.scene.input.keyboard.addKey('S');
    this.d = this.scene.input.keyboard.addKey('D');
    
  }

  setPlayerSpeed() {
    this.speedX = 250;
    this.speedY = 250.001;
    this.vX = 0;
    this.vY = 0;
  }

  preUpdate(t,dt) {
    super.preUpdate(t,dt);

    if (this.w.isDown) {
      this.vY = -1;      
    }
    else if (this.s.isDown){
      this.vY = 1;
    }
    else {
      this.vY = 0;
    }

    if (this.a.isDown) {
      this.vX = -1;
    }
    else if (this.d.isDown) {
      this.vX = 1;
    }
    else {
      this.vX = 0;        
    }
    let m = new Phaser.Math.Vector2 (this.vX * this.speedX, this.vY * this.speedY);
    m.normalize();
    this.body.setVelocityX(m.x * this.speedX);
    this.body.setVelocityY(m.y * this.speedY);
      
    this.playAnimations();
  }
    
}