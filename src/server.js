import http from 'http';
import { getUsers, getUser, createUser } from './controllers/userController.js';

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/').pop();
    getUser(req, res, id);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    createUser(req, res);
  } else {
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message : "Route not found"}));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
})

