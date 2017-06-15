const path = require('path');
const http = require('http');
const express = require('express'); 
const socketIO = require('socket.io');
const {generateMessage} = require('./untils/message')
const publicPath = path.join(__dirname,'../public');
const port =process.env.PORT || 3000
var app = express();
var server= http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath));
//app.get('/',function(req,res){
io.on('connection', (socket) => {
    console.log('New User connected');

socket.emit('newMessage',generateMessage ('Admin','Welcome tochat'))
  
socket.broadcast.emit('newMessage',generateMessage ('Admin','NewUser Join'))

socket.on('createMessage', (message,callback)=>{
     console.log('createMessage',message);
    io.emit('newMessage',generateMessage (message.from,message.text))
    callback('This is from server')
    // socket.broadcast.emit('newMessage',{
    //         from:message.from,
    //         text:message.text,
    //     createAt: newDate().getTime()
    // })
});

socket.on('disconnect', () => {
    console.log('User disconnect server');
   });
});
//})
// server.listen(3000,'10.66.2.61',function(){
// //  server.close(function(){
// //    server.listen(3001,'10.66.6.54')
  
//  })
// })

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
