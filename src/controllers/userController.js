import * as User from '../models/userModel.js';
import { getPostData } from '../utils.js';

// @desc Gets All Users
// @route GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

// @desc Gets Single User
// @route GET /api/users/:id
const getUser = async (req, res, id) => {
  try {
    const user = await User.findById(id);
    console.log(id);
    if(user) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({message: 'User does not exist'}));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc Cretae new User
// @route POST /api/users
const createUser = async (req, res) => {
  try {
    const body = await getPostData(req);

    const { name, age, hobby } = JSON.parse(body);

    const user = {
      name,
      age,
      hobby, 
    }

    const newUser = await User.create(user);
    res.writeHead(201, {"Content-Type": "application/json"});
    return res.end(JSON.stringify(newUser));

  } catch (error) {
    console.log(error);
  }
}

// @desc Update an existing User
// @route PUT /api/users/:id
const updateUser = async (req, res, id) => {
  try {
    const user = await User.findById(id);
    if (user) {
      const body = await getPostData(req);  
      const { name, age, hobby } = JSON.parse(body);
  
      const userData = {
        name: name || user.name,
        age: age || user.age,
        hobby: hobby || user.hobby, 
      }
  
      const updatedUser = await User.update(id, userData);
      res.writeHead(200, {"Content-Type": "application/json"});
      return res.end(JSON.stringify(updatedUser));
    } else {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({message: 'User does not exist'}));
    }
    
  } catch (error) {
    console.log(error);
  }
}

// @desc Delete Single User
// @route DELETE /api/users/:id
const deleteUser = async (req, res, id) => {
  try {
    const user = await User.findById(id);
    console.log(id);
    if(user) {
        await User.remove(id);
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: `User ${id} removed`}));
    } else {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({message: 'User does not exist'}));
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}