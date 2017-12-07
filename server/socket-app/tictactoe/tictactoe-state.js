const _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull = false;
        var board = [
            ['','',''],
            ['','',''],
            ['','','']
        ];

        function processEvent(event) {

            if (event.type==="MovePlaced") {
                var x = event.place[0];
                var y = event.place[1];
                board[x][y] = event.symbol;
            }

            if (event.type==="GameJoined") {
                gamefull = true;
            }
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
            return gamefull;
        }

        function symbolAt(x, y) {
            return board[x][y];
        }
        

        processEvents(history);

        return {
            gameFull:gameFull,
            processEvents: processEvents,
        }
    };
};
