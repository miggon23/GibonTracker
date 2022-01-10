import Data from './data.js';

export default class Living extends Phaser.GameObjects.Sprite{
    /**
     * Constructor de la clase de la que heredan los objetos vivientes de la escena
     */
    constructor(scene, x, y, sprite){
        super(scene, x, y, sprite);
        this.banana = false;
        
    }

    hasBanana(){
        return this.banana;
    }

    pickUpBanana(){
        this.banana = true;
    }

    dropBanana(){
        this.banana = false;
    }

    // createAnimations() {
    //     this.scene.anims.create({
    //         key: 'monkey_right',
    //         frames: this.anims.generateFrameNumbers('monkey', { start: 0, end: 2 }),
    //         frameRate: Data.animFrameRate,
    //         repeat: 0,
    //     });

    //     this.scene.anims.create({
    //         key: 'monkey_up',
    //         frames: this.anims.generateFrameNumbers('monkey', { start: 3, end: 5 }),
    //         frameRate: Data.animFrameRate,
    //         repeat: 0,
    //     });

    //     this.scene.anims.create({
    //         key: 'monkey_down',
    //         frames: this.anims.generateFrameNumbers('monkey', { start: 6, end: 8 }),
    //         frameRate: Data.animFrameRate,
    //         repeat: 0,
    //     });

    //     this.scene.anims.create({
    //         key: 'monkey_right_banana',
    //         frames: this.anims.generateFrameNumbers('monkey', { start: 9, end: 11 }),
    //         frameRate: Data.animFrameRate,
    //         repeat: 0,
    //     });

    //     this.scene.anims.create({
    //         key: 'monkey_up_banana',
    //         frames: this.anims.generateFrameNumbers('monkey', { start: 12, end: 14 }),
    //         frameRate: Data.animFrameRate,
    //         repeat: 0,
    //     });

    //     this.scene.anims.create({
    //         key: 'monkey_down_banana',
    //         frames: this.anims.generateFrameNumbers('monkey', { start: 15, end: 17 }),
    //         frameRate: Data.animFrameRate,
    //         repeat: 0,
    //     });
    // }

    playAnimations(){
        let velX = this.body.velocity.x;
        let velY = this.body.velocity.y;
        let string = ' ';
        if(Math.abs(velY) > Math.abs(velX)){
            if(velY > 0){
                string = 'monkey_down';
            }
            else{
                string = 'monkey_up';
            }
        }
        else if (Math.abs(velY) < Math.abs(velX)){
            if(velX > 0){
                this.flipX = false;
            }
            else{             
                this.flipX = true;
            }
            string = 'monkey_right';
        }
        else{
            string = 'monkey_down';
        }

        //Si le mono lleva plátano le añadimos la animación con este
        if(this.hasBanana()) { string += '_banana'}
        
        this.play(string, true);
    }
}