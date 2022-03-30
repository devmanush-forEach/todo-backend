const express = require('express');
const { signup, signin } = require('./authentication/auth.controller')

const app = express();
const connect = require('./configs/db')

const port = process.env.PORT || 2234;
const { body } = require('express-validator');


const todoItemRoutes = require('./routes/todoItem.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json());

app.use('/todo-item', todoItemRoutes);
app.use('/user', userRoutes);



app.post('/signup',
    body('firstname').isLength({ min: 3 }).withMessage("Please provide a valid firstname"),
    body('roles').isLength({ min: 3 }).withMessage("Please provide a valid name"),
    body('email').isEmail().withMessage("Please enter a valid email."),
    body('password').isLength({ min: 8 }).withMessage("Please enter a password of length greater than 8."),
    signup)
app.post('/signin',

    body('email').isEmail().withMessage("Please enter a valid email."),
    body('password').isLength({ min: 8 }).withMessage("Please enter a password of length greater than 8."),
    signin)

app.get('/', (req, res) => {
    return res.send("Welcome to Nikhil's Server")
})


// app.listen(port, connect)

app.listen(port, () => {
    connect();
    console.log(`Running on url https://localhost:${port}/`)
})



