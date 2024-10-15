import {io, Socket } from 'socket.io-client';

let socket:Socket ;

const initiateSocketConnection=(userId:string)=>{
    console.log("initiating socket connection for ",userId);
    socket=io('http://98.130.9.242:1236/', {
        transports:['websocket'],
        query: {
            userId: userId 
        }
});
}

const getSocket=()=>socket

export {initiateSocketConnection,getSocket}