import Wall from "./wall.js";

export default class Hideout extends Phaser.GameObjects.Sprite{
    /**
     * Constructor de los enemigos
     * @param {*} scene Escena a la que pertenece el enemigo 
     * @param {*} info información relativa al propio GameObject
     * @param {*} hideGroup 
     */
    constructor(scene, info, hideGroup, wallgroup){
        super(scene, info.x, info.y, 'hider');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.setDepth(2);
        hideGroup.add(this);
        this.wall = new Wall(this.scene, this.x, this.y, this.displayWidth, this.displayHeight, wallgroup, false)

        this.setCollider();
    }

    setCollider() {
        this.posXCollider = this.displayHeight * 0.6;
        this.posYCollider = this.displayHeight * 0.3;
        this.sizeXCollider = this.displayWidth * 0.08;
        this.sizeYCollider = this.displayHeight * 0.08;

        // this.body.setOffset(this.posXCollider, this.posYCollider);
        this.body.setSize(this.sizeXCollider, this.sizeYCollider, true);
    }
}