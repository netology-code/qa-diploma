const fs = require('fs');
const express = require('express');
const uuidv4 = require('uuid/v4');

const data = JSON.parse(fs.readFileSync('data.json', 'UTF-8'));
console.log(data);

const server = express();
server.use(express.json());

server.post(['/payment', '/credit'], (req, res) => {
  console.log(`Incoming request: ${req.path} ${JSON.stringify(req.body)}`);
  const {body: {number}} = req;

  const [item] = data.filter(o => o.number === number);
  if (item === undefined) {
    res.status(400).end();
    return;
  }

  res.send({
    id: uuidv4(),
    status: item.status,
  });
});

// get port from environment variable or just use 9999
server.listen(process.env.PORT || 9999);
