import users from '../data/users.js';
import { v4 as uuidv4 } from 'uuid';

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find(u => u.id === id);
    console.log(users, id);
    resolve(user);
  });
}

const create = (user) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    resolve(newUser);
  });
}

export {
  findAll,
  findById,
  create,
}