const express = require('express'); // importing a CommonJS module

const helmet = require("helmet")

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//middleware first


//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`)
  next()
}


server.use(express.json());// built in middlewasre
server.use(logger)
//endpoints after// thisi is the global middleware
// server.use(helmet());
// commented out to out to apply locally to one get

server.use('/api/hubs', hubsRouter);// this is also a local middleware

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});
//shift + alt plus up or down to copy selected lines
server.get("/echo", (req, res)=> {
  res.send(req.headers);
})
server.get("/area51", helmet(), (req, res)=> {
  res.send(req.headers);
})

module.exports = server;
