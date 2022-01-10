const Data = {
    enemies : {
        initMinTime: 2000,
        initMaxTime: 3200,
        minRandTime: 2000,
        maxRandTime: 6000,
    },
    gameZone : {
        x: 0,
        y: 0,
        scaleX: 1800,
        scaleY: 1400
    },
    hideouts: 
    [
        {
            x: -200,
            y: -350,
        },
        {
            x: 400,
            y: 50,
        },
        {
            x: 300, 
            y: 500,
        },
        {
            x: 300,
            y: -500,
        },
        {
            x: -450,
            y: 280,
        },
        // {
        //     x: -650,
        //     y: -50,
        // }

    ],
    maxEnemies : 8,
    bananas: 1,
    gameDuration: 1000 * 60 * 1.2, // milisg/seg/minutes 
    delayAfterTimeReached: 3000, 
    animFrameRate: 10,
}
export default Data