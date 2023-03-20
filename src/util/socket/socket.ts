import { AuthenticatedUser } from 'src/feature/users/domain/AuthenticatedUser';
import { UserEntity } from 'src/feature/users/data/model/UserEntity';
// const io = require('socket.io')(3001);
import * as ioo from 'socket.io';
const users = {};
const io = new ioo(3003);
async function setLastSeen(user) {
  if (user) {
    await UserEntity.findByIdAndUpdate(user, { lastSeen: Date.now() });
  }
}

async function getUser() {
  const user: any = await UserEntity.findById(
    AuthenticatedUser.getInstance().userId,
  );
  return user;
}
//on connection
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Sock() {
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

    //Notf
    // socket.on("notify", notify =>{
    //   socket.on(notify, notification => {
    //     //notification = {"userId":"EventId or Comment or "}
    //   })
    // })

    //Going
    socket.on('going', async going => {
      const activeUser = await getUser();

      for (let i = 0; activeUser.friends; i++) {
        if (Object.hasOwnProperty.call(users, activeUser.friends[i])) {
          users[activeUser.friends[i]].emit('going', 'Going NOTIFy');
        }
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
      // setLastSeen(userId);
    });
  });
}
