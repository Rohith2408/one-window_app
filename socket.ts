import io from 'socket.io-client';

const socket = io('http://98.130.9.242:1236/',{transports:['websocket']}); 

export default socket