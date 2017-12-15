import React from 'react';

export default function (injected) {
    const eventRouter = injected('eventRouter');
    const commandPort = injected('commandPort');
    const generateUUID = injected('generateUUID');

    class TictactoeMessage extends React.Component {
        constructor() {
            super();
            this.state = {
                move:{}
            }
        }
        componentWillMount(){
            
            this.unsubscribe = eventRouter.on('MovePlaced', (moveEvent)=>{
                var move = moveEvent.move.xy;
                var prop = this.props.coordinates;
                if(move.x === prop.x && move.y === prop.y) {
                    this.setState({
                        move: {xy: move, side: moveEvent.move.side}
                    });
                }

            //    Key logic goes here. Remember---the cell gets all move events, not only its own.
                
            })
        }
        componentWillUnmount(){
            this.unsubscribe();
        }
        placeMove(coordinates){
            return ()=>{
                let cmdId = generateUUID();
                commandPort.routeMessage({
                    commandId:cmdId,
                    type:"PlaceMove",
                    gameId:this.props.gameId,
                    move:{
                        xy:coordinates,
                        side:this.props.mySide
                    }
                });
            }
        }
        render() {
            return <div ref="ticCell" className="ticcell" onClick={this.placeMove(this.props.coordinates)}>
                {this.state.move.side}
            </div>
        }
    }
    return TictactoeMessage;
}
