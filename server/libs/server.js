const mysql = require('../models/mysql');
const socketioJwt = require('socketio-jwt');
module.exports = (io)=> {
  // io.use(socketioJwt.authorize({
  //       secret: process.env.JWT_SECRET,
  //       handshake: true
  // }));
  let numUsers = 0;
  io.on('connection',  (socket)=> {
  		let user_Add = false;
      socket.on('new_message', function (data) {
        mysql.user.getUserByUsername(socket.username).then((user)=>{
           mysql.messages.insert(
            data.message,
            data.position,
            user[0].id
           );
        })
        socket.broadcast.emit('new_message', data);
      });

      socket.on('user_login',  (user)=> {
        if (user_Add) return;
        socket.username = user.username;
        socket.name = user.name
        ++numUsers;
        user_Add = true;
        socket.emit('login', {
          numUsers: numUsers
        });

        socket.broadcast.emit('user_loggedIn', {
          username: socket.username,
          name:socket.name,
          userTotal: numUsers
        });
       
      });

      socket.on('typing', function () {
        socket.broadcast.emit('typing', {
          name: socket.name
        });
      });

      socket.on('stop_typing', function () {
        socket.broadcast.emit('stop_typing', {
          username: socket.username 
        });  
      });

      socket.on('disconnect', function () {
        if (user_Add) {
          --numUsers;
          socket.broadcast.emit('user_loggedOut', {
            name: socket.name,
            numUsers: numUsers
          });
        }
      });
  });

}