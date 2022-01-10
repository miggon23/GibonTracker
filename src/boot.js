import Data from './data.js'

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
        this.createAnimations();
        this.scene.start('menu');
    }

    createAnimations() {
        this.anims.create({
            key: 'monkey_right',
            frames: this.anims.generateFrameNumbers('monkey', { start: 0, end: 2 }),
            frameRate: Data.animFrameRate,
            repeat: 0,
        });

        this.anims.create({
            key: 'monkey_up',
            frames: this.anims.generateFrameNumbers('monkey', { start: 3, end: 5 }),
            frameRate: Data.animFrameRate,
            repeat: 0,
        });

        this.anims.create({
            key: 'monkey_down',
            frames: this.anims.generateFrameNumbers('monkey', { start: 6, end: 8 }),
            frameRate: Data.animFrameRate,
            repeat: 0,
        });

        this.anims.create({
            key: 'monkey_right_banana',
            frames: this.anims.generateFrameNumbers('monkey', { start: 9, end: 11 }),
            frameRate: Data.animFrameRate,
            repeat: 0,
        });

        this.anims.create({
            key: 'monkey_up_banana',
            frames: this.anims.generateFrameNumbers('monkey', { start: 12, end: 14 }),
            frameRate: Data.animFrameRate,
            repeat: 0,
        });

        this.anims.create({
            key: 'monkey_down_banana',
            frames: this.anims.generateFrameNumbers('monkey', { start: 15, end: 17 }),
            frameRate: Data.animFrameRate,
            repeat: 0,
        });
    }

}