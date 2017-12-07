let should = require('should');
let _ = require('lodash');

let TictactoeState = require('./tictactoe-state')(inject({}));

let tictactoe = require('./tictactoe-game')(inject({
    TictactoeState
}));

let createEvent = {
    type: "GameCreated",
    user: {
        userName: "TheGuy"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};

let joinEvent = {
    type: "GameJoined",
    user: {
        userName: "Gummi"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};


describe('create game command', function() {


    let given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game created event', function(){

        given = [];
        when =
            {
                id:"123987",
                type: "CreateGame",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            };
        then = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            }
        ];

    })
});


describe('join game command', function () {


    let given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game joined event...', function () {

        given = [{
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];
        when = {
                type: "JoinGame",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            };
        then = [
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'O'
            }
        ];

    });

    it('should emit FullGameJoinAttempted event when game full...', function () {
        
        given = [{
            type: "GameCreated",
            user: {
                userName: "Anna"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:28:00"
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Jon"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:00",
                side:'O'
            }];
        when = {
                type: "JoinGame",
                user: {
                    userName: "Begga"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            };
        then = [
            {
                type: "FullGameJoinAttempted",
                user: {
                    userName: "Begga"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            }
        ];

    });
});

describe('make move command', function() {

    let given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should return MovePlaced event when the cell being placed is empty', function(){

        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Tota"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'O'
            }
        
        ];
        when = {
                type: "PlaceMove",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                place: [0,0],
                timeStamp: "2014-12-02T11:31:12",
                side: 'X'
            };
        then = [
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [0,0],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:31:12",
            }
        ];

    })

    it('should return IllegalMove when making a move on an occupied cell', function(){

        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Tota"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'O'
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [0,0],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:31:12",
            }
        
        ];
        when = {
                type: "PlaceMove",
                user: {
                    userName: "Tota"
                },
                name: "TheFirstGame",
                place: [0,0],
                timeStamp: "2014-12-02T11:32:12",
                side: 'O'
            };
        then = [
            {
                type:"IllegalMove",
                user: {
                    userName: "Tota"
                },
                place: [0,0],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:32:12",
            }
        ];

    })

    it('should return MovePlaced and GameWon when game is won by top horizontal line', function() {
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Tota"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'O'
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [0,0],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:36:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [0,1],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [1,0],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:38:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [0,2],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:12",
            }
        ];
        when = {
                type: "PlaceMove",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                place: [2,0],
                timeStamp: "2014-12-02T11:41:12",
                side: 'X'
        };
        then = [
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [2,0],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:12"
            },
            {
                type: "GameWon",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:12"
            }
        ];

    })

    it('should return MovePlaced and GameWon when game is won by middle horizontal line', function() {
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Tota"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'O'
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [0,1],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:36:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [1,0],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [1,1],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:38:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [0,0],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:12",
            }
        ];
        when = {
                type: "PlaceMove",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                place: [2,1],
                timeStamp: "2014-12-02T11:41:12",
                side: 'X'
        };
        then = [
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [2,1],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:12"
            },
            {
                type: "GameWon",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:12"
            }
        ];

    })

    it('should return MovePlaced and GameWon when game is won by bottom horizontal line', function() {
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Tota"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'O'
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [0,1],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:36:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [0,2],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [1,0],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:38:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [1,2],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [0,0],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:40",
            },
        ];
        when = {
                type: "PlaceMove",
                user: {
                    userName: "Tota"
                },
                name: "TheFirstGame",
                place: [2,2],
                timeStamp: "2014-12-02T11:41:12",
                side: 'O'
        };
        then = [
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [2,2],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:12"
            },
            {
                type: "GameWon",
                user: {
                    userName: "Tota"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:12"
            }
        ];
    })

    it('should return MovePlaced and GameWon when game is won by left vertical line', function() {

        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Tota"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'O'
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [0,0],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:36:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [1,0],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [0,1],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:38:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [2,0],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:12",
            }
        ];
        when = {
                type: "PlaceMove",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                place: [0,2],
                timeStamp: "2014-12-02T11:41:12",
                side: 'X'
        };
        then = [
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [0,2],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:12"
            },
            {
                type: "GameWon",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:12"
            }
        ];

    })

    it('should return MovePlaced and GameWon when game is won by middle vertical line', function() {
        
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Tota"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'O'
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [0,1],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:36:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [1,0],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [1,1],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:38:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [2,0],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:12",
            }
        ];
        when = {
                type: "PlaceMove",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                place: [2,1],
                timeStamp: "2014-12-02T11:41:12",
                side: 'X'
        };
        then = [
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [2,1],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:12"
            },
            {
                type: "GameWon",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:12"
            }
        ];
    })

    it('should return MovePlaced and GameWon when game is won by right vertical line', function() {
        
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Tota"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'O'
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [0,2],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:36:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [1,0],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [1,2],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:38:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [2,0],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:12",
            }
        ];
        when = {
                type: "PlaceMove",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                place: [2,2],
                timeStamp: "2014-12-02T11:41:12",
                side: 'X'
        };
        then = [
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [2,2],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:12"
            },
            {
                type: "GameWon",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:12"
            }
        ];
    })

    it('should return MovePlaced and GameWon when game is won by diagonal line 1', function() {
        
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Tota"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'O'
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [0,0],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:36:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [1,0],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [1,1],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:38:12",
            },
            {
                type:"MovePlaced",
                user: {
                    userName: "Tota"
                },
                place: [2,0],
                side: 'O',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:12",
            }
        ];
        when = {
                type: "PlaceMove",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                place: [2,2],
                timeStamp: "2014-12-02T11:41:12",
                side: 'X'
        };
        then = [
            {
                type:"MovePlaced",
                user: {
                    userName: "Anna"
                },
                place: [2,2],
                side: 'X',
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:12"
            },
            {
                type: "GameWon",
                user: {
                    userName: "Anna"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:12"
            }
        ];
    })

});
