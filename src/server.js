import http from 'http';
import 'dotenv/config';

import { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser, 
} from './controllers/userController.js';
import { parseId } from './utils.js';

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
    const id = parseId(req.url);
    getUser(req, res, id);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    createUser(req, res);
  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'PUT') {
    const id = parseId(req.url);
    updateUser(req, res, id);
  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'DELETE') {
    const id = parseId(req.url);
    deleteUser(req, res, id);
  } else {
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message : "Route not found"}));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
})

