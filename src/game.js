import Boot from './boot.js';
import Level from './level.js';
import End from './end.js';
import Menu from './menu.js';
import Pause from './pause.js';

/**
 * Configuración de juego
 */
let config = {
    type: Phaser.auto,
    width:  800,
    height: 500,
    scale: {
        // mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    scene: [Boot, Menu, Level, End, Pause],
    physics: { 
        default: 'arcade', 
        arcade: {
            gravity: false,
            debug: false,

        }
    },
    backgroundColor: '#95FF99'
}
new Phaser.Game(config);