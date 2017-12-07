
module.exports = function(injected){
    let TictactoeState = injected('TictactoeState');

    return function(history){

        let gameState = TictactoeState(history);

        return {
            executeCommand: function(cmd, eventHandler){
                function applyEvents(events, moreEvents){
                    gameState.processEvents(events);

                    //checking horizontal win conditions
                    for (var i = 0; i <=2; i++)
                    {
                        if(gameState.symbolAt(0,i) != '' &&gameState.symbolAt(0,i) == gameState.symbolAt(1,i) && gameState.symbolAt(0,i) == gameState.symbolAt(2,i))
                        {
                            events.push({
                                gameId: cmd.gameId,
                                type: "GameWon",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp
                            });
                        }
                    }
                    //checking vertical win conditions
                    for (var i = 0; i <=2; i++)
                    {
                        if(gameState.symbolAt(i,0) != '' &&gameState.symbolAt(i,0) == gameState.symbolAt(i,1) && gameState.symbolAt(i,0) == gameState.symbolAt(i,2))
                        {
                            events.push({
                                gameId: cmd.gameId,
                                type: "GameWon",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp
                            });
                        }
                    }
                    eventHandler(events);
                }

                let cmdHandlers = {
                    "CreateGame": function (cmd) {
                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameCreated",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'X'
                        }]);

                    },
                    "JoinGame": function (cmd) {
                        if(gameState.gameFull()) {
                            applyEvents( [{
                                gameId: cmd.gameId,
                                type: "FullGameJoinAttempted",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp
                            }]);
                            return;
                        }

                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameJoined",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'O'
                        }]);
                    },
                    "LeaveGame": function (cmd) {
                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameLeft",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }]);
                    },
                    "PlaceMove": function(cmd){
                        var x = cmd.place[0];
                        var y = cmd.place[1];
                        if (gameState.symbolAt(x,y)==='') {
                            applyEvents([{
                                gameId: cmd.gameId,
                                type:"MovePlaced",
                                user: cmd.user,
                                place: cmd.place,
                                side: cmd.side,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                            }])
                        } 
                        else {
                            applyEvents([{
                                gameId: cmd.gameId,
                                type:"IllegalMove",
                                user: cmd.user,
                                place: cmd.place,
                                side: cmd.side,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                            }])
                        } 
                    },
                    "RequestGameHistory": function(cmd){
                        // Game does not handle this query command, is declared here for making tests more robust.
                    }
                };

                if(!cmdHandlers[cmd.type]){
                    throw new Error("I do not handle command of type " + cmd.type)
                }
                cmdHandlers[cmd.type](cmd);
            }
        }
    }
};

