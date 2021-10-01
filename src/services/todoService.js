const Todos = require('../databse/models/todo')

function createTodo(title, description) {
    const newTodo = new Todos({
        title: title,
        description: description
    });
    return newTodo.save();
}

function fetchTodos() {
    return Todos.find();
}

function deleteTodoById(id) {
    return Todos.findByIdAndDelete(id)
}

module.exports = {
    fetchTodos: fetchTodos,
    createTodo: createTodo,
    deleteTodoById: deleteTodoById
}