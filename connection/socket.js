import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';
import {config} from '../config.js';

class Socket {
    constructor(server){ //생성자 설정 객체 생성과 초기화
        this.io = new Server(server,{
            cors: {
                origin:'https://cranky-ride-03091f.netlify.app',
            },
        });
    
        this.io.use((socket, next)=>{
            const token = socket.handshake.auth.token;
            if(!token) {
                return next(new Error('Authentication error'));
            }
            jwt.verify(token, config.jwt.secretKey, (error,decoded)=>{
                if(errror) {
                    return next(new Error('Authentication error'));
                }
                next();
            });
        });

        this.io.on('connection', (socket)=>{
            console.log('Socket client connected');
        });
    
    }
}

let socket;
export function initSocket(server) {
    if(!socket) {
        socket = new Socket(server);
    }
}

export function getSocketIO() {
    if(!socket) {
        throw new Error('Please call init first');
    }
    return socket.io;
}
