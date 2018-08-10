const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
// websocket work with express
const server = require('http').Server(app);
app.use((req, res, next) => {
  console.log(req.url);
  next();
});
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter);

server.listen(3300, () => {
  console.log('app is listen @ 3300');
});

module.exports = server;

require('./socket');
