export default class Pause extends Phaser.Scene{
    //Recordar añadir la escena de pausa en las scenes del game.js
    constructor(){
        super({key: 'pause'});
    }

    create(){
        this.input.keyboard.on('keydown-ESC', () => {
            this.unpause();
        });
        this.add.text(this.cameras.main.displayWidth * 0.5, this.cameras.main.displayHeight * 0.5, 'PAUSE')
        .setOrigin(0.5, 0.5) //Importante para centrarlo bien
        .setScrollFactor(0);
    }

    unpause(){
        this.scene.resume('level');
        this.scene.stop();
    }

}