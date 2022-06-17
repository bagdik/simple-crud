import * as User from '../models/userModel.js';
import { getPostData, isValidId } from '../utils.js';

// @desc Gets All Users
// @route GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: 'There is an error on server side'}));
  }
}

// @desc Gets Single User
// @route GET /api/users/:id
const getUser = async (req, res, id) => {
  try {
    const user = await User.findById(id);
    
    if (user && isValidId(id)) {

      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(user));

    } else if(user && !isValidId(id)) {

      res.writeHead(400, {"Content-Type": "application/json"});
      res.end(JSON.stringify({ message: 'User ID is invalid (not uuid)' }));

    } else {

      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({message: 'User does not exist'}));

    }
  } catch (error) {
    res.writeHead(500, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: 'There is an error on server side'}));
  }
}

// @desc Cretae new User
// @route POST /api/users
const createUser = async (req, res) => {
  try {
    const body = JSON.parse(await getPostData(req));

    if (
      !body.hasOwnProperty('name') || 
      !body.hasOwnProperty('age') || 
      !body.hasOwnProperty('hobbies')) {

        res.writeHead(400, {"Content-Type": "application/json"});
        return res.end(
        JSON.stringify({message: 'Name, age, hobbies are required fields'})
      
      );
    }

    const { name, age, hobbies } = body;

    const user = {
      name,
      age,
      hobbies, 
    } 

    const newUser = await User.create(user);
    res.writeHead(201, {"Content-Type": "application/json"});
    return res.end(JSON.stringify(newUser));

  } catch (error) {
    res.writeHead(500, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: 'There is an error on server side'}));
  }
}

// @desc Update an existing User
// @route PUT /api/users/:id
const updateUser = async (req, res, id) => {
  try {
    const user = await User.findById(id);

    if (user && isValidId(id)) {
      const body = await getPostData(req);  
      const { name, age, hobbies } = JSON.parse(body);
  
      const userData = {
        name: name || user.name,
        age: age || user.age,
        hobbies: hobbies || user.hobbies, 
      }
  
      const updatedUser = await User.update(id, userData);
      res.writeHead(200, {"Content-Type": "application/json"});
      return res.end(JSON.stringify(updatedUser));
    } else if (user && !isValidId(id)) {
      res.writeHead(400, {"Content-Type": "application/json"});
      res.end(JSON.stringify({ message: 'User ID is invalid (not uuid)' }));
    } else {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({message: 'User does not exist'}));
    }
    
  } catch (error) {
    res.writeHead(500, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: 'There is an error on server side'}));
  }
}

// @desc Delete Single User
// @route DELETE /api/users/:id
const deleteUser = async (req, res, id) => {
  try {
    const user = await User.findById(id);

    if(user && isValidId(id)) {
      await User.remove(id);
      res.writeHead(204, {"Content-Type": "application/json"});
      res.end(JSON.stringify({message: `User ${id} removed`}));
    } else if (user && !isValidId(id)) {
      res.writeHead(400, {"Content-Type": "application/json"});
      res.end(JSON.stringify({ message: 'User ID is invalid (not uuid)' }));
    } else {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({message: 'User does not exist'}));
    }
  } catch (error) {
    res.writeHead(500, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: 'There is an error on server side'}));
  }
}

export {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}