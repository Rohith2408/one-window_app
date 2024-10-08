import io from 'socket.io-client';
import { SOCKET_URL } from './componentData';

const socket = io('http://98.130.9.242:1236/',{transports:['websocket']}); 

export default socket