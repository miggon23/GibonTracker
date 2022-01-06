import Wall from './wall.js'

export default class GameZone extends Phaser.GameObjects.Zone{

    constructor(scene, info, wallsGroup){
        super(scene, info.x, info.y);

        this.wallThickness = 40;

        this.displayWidth = info.scaleX;
        this.displayHeight = info.scaleY;

        this.scene.add.image(this.x, this.y, 'playground').setScale(1.4, 1.22);

        this.setWalls(scene, wallsGroup);
    }

    /**
     * 
     * @param {Phaser.Scene} scene Escena de juego
     * @param {Group} wallsGroup Grupo de muros
     */
    setWalls(scene, wallsGroup) {
        new Wall(scene, this.getLeftCenter().x, this.getLeftCenter().y, this.wallThickness, this.displayHeight, wallsGroup);
        new Wall(scene, this.getBottomCenter().x, this.getBottomCenter().y, this.displayWidth, this.wallThickness, wallsGroup);
        new Wall(scene, this.getRightCenter().x, this.getRightCenter().y, this.wallThickness, this.displayHeight, wallsGroup);
        new Wall(scene, this.getTopCenter().x, this.getTopCenter().y, this.displayWidth, this.wallThickness, wallsGroup);
    }
}