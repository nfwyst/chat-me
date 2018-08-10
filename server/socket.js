const { getModel } = require('./model');
const server = require('./server');

const io = require('socket.io')(server);
io.on('connection', (soc) => {
  soc.on('sendmsg', async ({ from, to, msg }) => {
    const chatid = [from, to].sort().join('');
    try {
      let result = await getModel('chat').create({ chatid, from, to, content: msg });
      if (result) {
        io.emit('recvmsg', result);
      } else {
        io.emit('error', 'store msg failed');
      }
    } catch (err) {
      io.emit('error', err.message);
    }
  });
});
