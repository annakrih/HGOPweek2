import React from 'react';
import { shallow } from 'enzyme';

import TicCellComponent from './TicCell';


import MessageRouter from '../common/framework/message-router';


describe("Tic Cell", function () {

    let div, component, TicCell;

    let commandRouter = MessageRouter(inject({}));
    let eventRouter = MessageRouter(inject({}));
    let commandsReceived=[];

    commandRouter.on("*", function(cmd){
        commandsReceived.push(cmd);
    } );

    beforeEach(function () {
        commandsReceived.length=0;
        TicCell = TicCellComponent(inject({
            generateUUID:()=>{
                return "youyouid"
            },
            commandPort: commandRouter,
            eventRouter
        }));

        div = document.createElement('div');

        component = shallow(<TicCell coordinates={{x:1,y:2}} gameId="thegame" />, div);
    });

    function given() {
        //noinspection JSUnusedAssignment
        let side, xy, gameId="thegame";
        let api = {
            side(aside){
                side = aside;
                return api;
            },
            gameId(agameId){
                gameId=agameId;
                return api;
            },
            xy(axy){
                xy = axy;
                return api;
            },
            xy(axy){
                xy = axy;
                return api;
            },
            placeMove(){
                eventRouter.routeMessage({
                    type: "MovePlaced",
                    gameId: gameId,
                    move: {
                        side: side,
                        xy: xy
                    }
                });
                return api;
            }
        };
        return api;

    }


    it('should render without error', function () {
        
    });

    it('Place a move', function () {
        given().side('X').gameId('thegame').xy({x: 1, y:2}).placeMove();
        expect(component.text()).toBe("X");
    })

});