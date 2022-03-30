const express = require('express');
const User = require('../models/users.model')
const { body, validationResults } = require('express-validator');

const router = express.Router();

router.get('/',
    

    async (req, res) => {


        try {
            const users = await User.find().lean().exec();
            return res.status(200).send(users);
        } catch (err) {
            return res.status(500).send(err.message);
        }
    })

module.exports = router;