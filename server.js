// server for dating on warpcast using socket.io
const { Server } = require("socket.io");
const http = require("http");

const httpServer = http.createServer();
let accounts = [{
  username: 'makemake',
  preference: 'male',
  gender: 'female'
}, {
  username: 'linda',
  preference: 'male',
  gender: 'female'
},
{
  username: 'nishu',
  preference: 'female',
  gender: 'male'
},
{
  username: 'john',
  preference: 'female',
  gender: 'male'
}

];
let matches = [];
let user = {
  username: '',
  preference: '',
  gender: ''
}
let room = 'lovecaster' // everyone is in the same room 

const io = new Server(httpServer, {
  // your options here
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  // join a specific room
  socket.on("joinRoom", ({ preference, username, gender }) => {
    socket.join(room);
    // add user to accounts
    if (!accounts.find(account => account.username === username)) {
      accounts.push({ preference, username, gender });
    } 
    // send all accounts to the user that are of preference
    socket.emit("getAccounts", accounts.filter(account => account.gender === preference));
  });


});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Socket.io server running on port ${PORT}`));
