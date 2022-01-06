export default class End extends Phaser.Scene{
    constructor(){
        super({key: 'end'})
        
    }

    create(info){
        this.info = info;

        this.background = this.add.image(0, 0, 'background')
        .setOrigin(0, 0)
        .setScale(1.4, 1.2);        

        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2
        this.scoreImage = this.add.image(centerX, centerY, 'pergamino');

        let playerString = 'Player Score: ' + this.info.playerScore;
        let enemyString = 'Monkey score: ' + this.info.enemyScore;
        
        this.showResults(centerX, centerY, playerString, enemyString); 
        this.time.addEvent({
            delay: 1000,
            callback: this.showResults,
            callbackScope: this,
        }) 

        this.time.addEvent({
            delay: 3000,
            callback: this.createListenerToPlayAgain,
            callbackScope: this,
        });
    }

    showResults(centerX, centerY, playerString, enemyString) {
        this.showScore(centerX, centerY, playerString);
        this.showScore(centerX, centerY + 50, enemyString);
    }

    showScore(centerX, centerY, string) {
        this.add.text(centerX, centerY, string, {
            fontFamily: 'Courier',
            fill: '#000000',
            fontSize: 18,
        })
        .setOrigin(0.5, 0.5) // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center');
    }

    createListenerToPlayAgain(){
        
        this.space = this.input.keyboard.addKey('SPACE');
        this.space.on('down', function () { 
            this.scene.start('level');
        }, this);

        this.q = this.input.keyboard.addKey('Q');
        this.q.on('down', function () { 
            this.scene.start('menu');
        }, this);

        this.add.text(this.cameras.main.height / 2, this.cameras.main.height - 40,
             'Press Spacebar to play again\n Q to back',{
            fontFamily: 'Courier',
            fill: '#000000',
            fontSize: 18,
        })
    }
}