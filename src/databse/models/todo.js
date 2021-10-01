const mongoose = require('mongoose');
const todoSchema = require('../schema/todo');

const Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;