import {Server} from 'socket.io'
import express from 'express'
import http from 'http'
const app = express()
const server = http.createServer(app)
const io =new Server(server,{
    cors:{
        origin:['http://localhost:5173']
    }
})
let usermaps={}
async function returnid(id){
    return usermaps[id]//returns socket id
}
io.on('connection',(socket)=>{
    console.log(' a user was connected',socket.id)
    const userId = socket.handshake.query.id
    usermaps[userId]=socket.id
    console.log(usermaps)
    io.emit('getusers',Object.keys(usermaps))
    socket.on('disconnect',()=>{
        delete usermaps[userId]
        io.emit('getusers',Object.keys(usermaps))
        console.log(' a user was logged out',socket.id)
    })
})
server.timeout = 120000;
export {app,server,io,returnid,usermaps}