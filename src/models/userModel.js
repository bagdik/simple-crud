import loadedUsers from '../data/users.js';
import { v4 as uuidv4 } from 'uuid';

let users = loadedUsers.slice(0);

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

const update = (id, user) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex(u => u.id === id);
    users[index] = { id, ...user };
    resolve(users[index]);
  });
}

const remove = (id) => {
  return new Promise((resolve, reject) => {
    users = users.filter(u => u.id !== id);
    resolve();
  });
}

export {
  findAll,
  findById,
  create,
  update,
  remove,
}