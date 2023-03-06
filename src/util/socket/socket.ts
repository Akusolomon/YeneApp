import { UserEntity } from 'src/feature/users/data/model/UserEntity';
// const io = require('socket.io')(3001);
import * as ioo from 'socket.io';
const users = {};
const io = new ioo(3001);
async function setLastSeen(user) {
  if (user) {
    await UserEntity.findByIdAndUpdate(user, { lastSeen: Date.now() });
  }
}
//on connection
io.on('connection', function(socket) {
  socket.on('user/login', user => {
    console.log(`[EVENT] User ${user} connected`);
    users[user] = socket;
    io.emit('userLoggedIn', Object.keys(users));
  });

  //on Logout
  socket.on('logout', user => {
    console.log(`[EVENT] User ${user} left using logout!`);
    setLastSeen(user);
    try {
      delete users[user];
      io.emit('userLoggedIn', Object.keys(users));
    } catch (err) {
      console.log(err);
    }
  });
  //On Message
  socket.on('message/send', message => {
    try {
      users[message.to].emit('message/sent', message);
    } catch (err) {
      console.log('[ERR] Unable to relay message!');
    }
  });

  //On Disconnect
  socket.on('disconnecting', function(_) {
    let userId;
    for (userId in users) {
      if (Object.hasOwnProperty.call(users, userId)) {
        const userSocket = users[userId];
        if (userSocket.id == this.id) {
          delete users[userId];
          break;
        }
      }
    }
    io.emit('userLoggedIn', Object.keys(users));

    console.log(`[EVENT] User ${userId} left`);
    setLastSeen(userId);
  });
});
