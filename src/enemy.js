import Living from './living.js'
import Data from './data.js';

export default class Enemy extends Living{
    constructor(scene, x, y, enemiesGroup, timerInfo, player){
        super(scene, x, y, 'monkey');

        enemiesGroup.add(this);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.timerInfo = timerInfo;
        this.player = player;

        this.speed = 200;
        this.persueSpeed = this.speed;
        this.timeToMove = Phaser.Math.Between(timerInfo.initMinTime, timerInfo.initMaxTime);
        this.acumulatedTime = 0;
        this.pickNextHideout();

        //Cambia el tamaño del collider del objeto. true es para mantener el centro del objeto:
        this.body.setOffset(25, 50);
        this.body.setSize(this.displayWidth * 0.55, this.displayWidth * 0.6, false);
    }

    

    pickNextHideout(){
        this.nextHideout = Phaser.Math.RND.pick(this.scene.getHideouts().children.entries);

        let collider = this.scene.physics.add.overlap(this, this.nextHideout, (o1, o2) => {
            o1.body.stop();
            //Animación para el hideout cuando llegue el enemigo

            o1.pickNextHideout();
            this.scene.physics.world.removeCollider(collider); //método para borrar un collider
        });
    }

    changeToNextHideout(hideout){

        if(hideout == null){
            hideout = this.nextHideout;
        }

        //Recordar que el moveToObject no sigue al objeto si este se mueve ni lo frena cuando llega a su destino
        // Mueve el objeto a this.speed px/s:
        this.scene.physics.moveToObject(this, hideout, this.speed);

        // Para que llegue a su destino en 2 segundos:
        // this.physics.moveTo(this, nextHideout, null, 2000);
        //this.playAnimations();
    }

    dropBanana(){
        this.banana = false;
        this.clearTint();
        this.desactivateCollider();
    }

    /**
     * Desactiva el collider durante un segundo
     */
    desactivateCollider(){
        this.body.enable = false;
        this.scene.time.addEvent({
            delay: 1000,
            callback: this.activateCollider,
            callbackScope: this,

        })
    }

    activateCollider(){
        this.body.enable = true;
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);

        //Persigue al jugador mientras tenga el plátano
        if(this.player.hasBanana()){ 
            this.scene.physics.moveToObject(this, this.player, this.persueSpeed);
            this.persueSpeed += 0.05;
        }
        else{ //Si el jugador no tiene el plátano, lo tiene alguno de los enemigos
            //Si no se está moviendo, aumentamos el contador
            if(this.body.velocity.x === 0 && this.body.velocity.y === 0)
            {
                //reseteamos también la velocidad de persecución
                this.persueSpeed = this.speed;
                this.acumulatedTime += dt;
            }

            if(this.acumulatedTime >= this.timeToMove)
            {
                this.changeToNextHideout(this.nextHideout);
                this.acumulatedTime -= this.timeToMove;
                //Reseteamos el timer tomando un valor aleatorio
                this.timeToMove = Phaser.Math.Between(this.timerInfo.minRandTime, this.timerInfo.maxRandTime)
            }
        }     
        this.playAnimations();  
       

    }

    
}