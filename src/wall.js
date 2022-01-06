export default class Wall extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, scaleX, scaleY, wallsGroup, visible = true){
        super(scene, x, y, 'empty');
        
        this.displayWidth = scaleX;
        this.displayHeight= scaleY;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true); //true como parámetro para estáticos
        wallsGroup.add(this);
        this.visible = visible;
    }
}