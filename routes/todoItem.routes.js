const express = require('express');
const TodoItems = require('../models/todoItem.model');
const authenticate = require('../middleware/authenticate.middleware');
const authorize = require('../middleware/authorize.middleware');

const { body, validationResults } = require('express-validator');

const router = express.Router();


router.get("/", authenticate, authorize(['user', 'admin']), async (req, res) => {



    try {
        const todoItems = await TodoItems.find().populate({ path: "user", select: { email: 1 } }).lean().exec();
        return res.status(200).send(todoItems);

    } catch (err) {
        return res.status(500).send(err.message);
    }
})


router.post('/',
    body('title').isLength({ min: 5 }).withMessage('Please provide a title.'),
    body('desc').isLength({ min: 5 }).withMessage('Please provide description.'),
    body('user').isLength({ min: 5 }).withMessage('Please enter a valid user ID.'),
    authenticate,
    authorize(['user']),
    async (req, res) => {

        const errors = validationResults(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        try {
            const todoItem = await TodoItems.create(req.body);
            return res.status(200).send(todoItem);

        } catch (err) {
            return res.status(500).send(err.message);
        }
    })


module.exports = router;