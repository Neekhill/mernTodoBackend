const express = require('express');
const TodoService = require('../services/todoService');
const router = express.Router();


router.post('/', (req, res) => {

    let { title, description } = req.body
    TodoService.createTodo(title, description)
        .then(() => {
            console.log('task created successfully!')
            res.status(200).send('task created successfully!');
        })
        .catch(error => {
            res.error(error);
        })
});

router.get('/', (req, res) => {
    TodoService.fetchTodos()
        .then((todos) => {
            console.log(todos);
            res.status(200).send(todos);
        })
        .catch(error => {
            res.send(error);
        })

});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    TodoService.deleteTodoById(id)
        .then(deletedTodo => {
            console.log(deletedTodo);
            res.send(deletedTodo)
        })
        .catch(error => {
            res.error(error);
        })

});

module.exports = router;