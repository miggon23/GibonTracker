import Player from './player.js'
import GameZone from './gamezone.js'
import Enemy from './enemy.js'
import Hideout from './hideout.js'
import Data from './data.js'

export default class level extends Phaser.Scene{

    /**
     * Escena principal del juego. El jugador debe mantener el plátano el mayor tiempo posible en su haber, los monos
     * tratarán de quitarte el plátano y esconderlo entre ellos
     */
    constructor(){
        super({key: 'level'})
    }

    create(){

        //Jugador
        this.player = new Player(this, 0, 200);
        this.playing = false;

        //Contadores de puntuación, van asociado al tiempo que ha tenido el jugador/enemigos la banana
        this.playerTime = 0;
        this.enemiesTime = 0;

        //Cámara
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(0.8); //0.8

        //Grupos
        this.walls = this.add.group();
        this.enemies = this.add.group();
        this.hideouts = this.add.group();

        this.gameZone = new GameZone(this, Data.gameZone, this.walls)
        this.physics.add.collider(this.player, this.walls);
        this.label = this.add.text(-20, -20, "").setScrollFactor(0).setDepth(1000);

        //Escondites
        this.spawnHideouts();

        //Input para quitar banana
        this.space = this.input.keyboard.addKey('SPACE');

        //Enemigos
        for(let i = 0; i < Data.maxEnemies; i++){
            new Enemy(this, this.gameZone.x, this.gameZone.y, this.enemies, Data.enemies, this.player);
        }
        
        for(let i = 0; i < Data.bananas; i++){
            this.giveBanana();
        }
        
        //Activamos los eventos overlap una vez haya pasado la animación inicial
        this.time.addEvent({
            delay: Data.enemies.maxRandTime,
            callback: this.overlapBetweenEnemies, 
            callbackScope: this,
        })

        this.overlapEnemyPlayer();
     
        this.time.addEvent({
            delay: 2000,
            callback: this.startPlaying, 
            callbackScope: this,
        })

    }

    spawnHideouts(){
        Data.hideouts.forEach(element => new Hideout(this, element, this.hideouts, this.walls), this);
    }

    /**
     * Devuelve el grupo de los escondites
     * @returns {group} hideouts 
     */
    getHideouts(){
        return this.hideouts;
    }

    /**
     * Activa el overlap entre enemigos, a partir de ahí empieza el contador de juego
     */
    overlapBetweenEnemies(){
        //Collisiones entre enemigos
        this.physics.add.overlap(this.enemies, this.enemies, (o1,  o2) => {
            if(o1.hasBanana()){
              o1.dropBanana();
              o2.pickUpBanana();  
            }
            else if (o2.hasBanana()){
              o2.dropBanana();
              o1.pickUpBanana();  
            }
        });
        
    }

    startPlaying(){
        this.playing = true;
    }

    /**
     * Crea las colisiones jugador-enemigo, que incluye quitar la banana a los enemigos 
     * así como que los enemigos roben la banana al jugador y que vuelvan a sus escondites
     */
    overlapEnemyPlayer(){
        //Collisiones entre enemigos
        this.physics.add.overlap(this.player, this.enemies, (player,  enemy) => {
            if(player.hasBanana()){ //Si el jugador tiene la banana, el enrmigo se lo roba){
                player.dropBanana();
                enemy.pickUpBanana();

                //Mandamos a cada enemigo a un nuveo escondite
                this.enemies.getChildren().forEach(function(enemy){
                    enemy.pickNextHideout();
                    enemy.changeToNextHideout();
                }, this);
            }
            else if(Phaser.Input.Keyboard.JustDown(this.space)){
                if(enemy.hasBanana()){ // Si el enemigo tiene la banana, la roba
                    enemy.dropBanana();
                    player.pickUpBanana();
                } 
            }
        });
    }

    /**
     * Método que le da una banana a un enemigo. 
     */
    giveBanana(){     
        Phaser.Math.RND.pick(this.enemies.children.entries).pickUpBanana();       
    }

    update(t, dt){
        if(this.playing){
            if(this.player.hasBanana()){
                this.playerTime += dt;
            }
            else{
                this.enemiesTime += dt;
            }
    
            //Comprobamos la suma de tiempo para ver si se ha llegado al límite
            if(this.playerTime + this.enemiesTime >= Data.gameDuration){
                this.playing = false;
                this.time.addEvent({
                    delay: Data.delayAfterTimeReached,
                    callback: this.nextScene,
                    callbackScope: this,
                });
                this.showEndImage();
            }

            this.label.text = 'Player:  ' + Math.round(this.playerTime / 10) + '\nMonkeys: ' + Math.round(this.enemiesTime / 10);
        }
    }

    showEndImage() {
        let imageTime = this.add.image((this.cameras.main.displayWidth * 0.5) - 60, (this.cameras.main.displayHeight * 0.5) - 60, 'time').setDepth(50)
        imageTime.setScrollFactor(0);
        imageTime.setScale(1.4, 1.6);
        imageTime.setAlpha(0.1);
        //Tween para un fade in
        this.tweens.add({
            targets: imageTime,
            alpha: 1,
            duration: Data.delayAfterTimeReached,
        })
    }

    nextScene(){
        let info ={
            playerScore: Math.round(this.playerTime / 10),
            enemyScore: Math.round(this.enemiesTime / 10),
        }

        this.scene.start('end', info);
    }

}


