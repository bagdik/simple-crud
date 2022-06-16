import users from '../data/users.js';

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

export {
  findAll,
}