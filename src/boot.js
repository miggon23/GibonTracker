export default class Boot extends Phaser.Scene{

    /**
     * Escena donde se cargan todos los assets necesarios para el juego
     */
    constructor(){
        super({key: 'boot'});
    }

    preload(){
        this.load.setPath('./assets/sprites')

        this.load.image('box', 'box.png');
        this.load.image('banana_box', 'banana_box.png');
        this.load.image('empty', 'empty.png');
        this.load.image('hider', 'hider.png');
        this.load.image('time', 'time.png');
        this.load.image('pergamino', 'pergamino.png');
        this.load.image('background', 'background.png'); //Imagen de Jesse M Itch.io
        this.load.image('playground', 'playing_ground.png');
        this.load.image('play_button', 'play_button.png');
        this.load.image('back', 'back.png');
        this.load.image('controls', 'controls.png');
        this.load.image('controls_button', 'controls_button.png');
        this.load.image('pointer', 'pointer.png');

        //Cargamos las spritesheets
        this.load.spritesheet('monkey', 'monkey_spritesheet.png', {frameWidth: 100, frameHeight: 120});
    }

    create() {
        this.scene.start('menu');
    }
}