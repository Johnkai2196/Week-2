'use strict';
const {request} = require('express');
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '1234',
  },
  {
    id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];
const getUser = (userId) => {
// TODO find single cat objecty from cats-array and return it
  return users.filter(val => val.id == userId);
};
module.exports = {
  users,
  getUser
};
