export default class Menu extends Phaser.Scene{
    constructor(){
        super({key:'menu'});
    }

    create(){
        this.background = this.add.image(0, 0, 'background')
        .setOrigin(0, 0)
        .setScale(1.4, 1.2);        

        this.playButton = this.add.image(this.cameras.main.displayWidth / 2, this.cameras.main.displayHeight / 3, 'play_button')
        .setInteractive().setScale(0.3);

        this.playButton.on('pointerup', function(event) {
            this.scene.start('level');
        }, this);

        this.controlsButton = this.add.image(this.cameras.main.displayWidth / 2, this.cameras.main.displayHeight* 0.66, 'controls_button')
        .setInteractive().setScale(0.35);

        this.controlsButton.on('pointerup', () => {
            this.controlsImage = this.add.image(this.cameras.main.displayWidth / 2, this.cameras.main.displayHeight / 2, 'controls')
            .setInteractive().setScale(0.6);
            this.add.existing(this.controlsImage);

            this.returnImage = this.add.image(this.controlsImage.getBottomLeft().x + 100, this.controlsImage.getBottomLeft().y - 50, 'back').setInteractive();
            this.add.existing(this.returnImage);

            this.returnImage.on('pointerup', function (event) { 
                this.controlsImage.destroy();
                this.returnImage.destroy();
            }, this);
        })
    }
}