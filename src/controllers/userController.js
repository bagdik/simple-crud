import * as User from '../models/userModel.js';

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
    const user = {
      name: 'sanya',
      age: 30,
      hobby: ['sport', 'TV'], 
    }

    const newUser = await User.create(user);
    res.writeHead(201, {"Content-Type": "application/json"});
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

export {
  getUsers,
  getUser,
  createUser,
}