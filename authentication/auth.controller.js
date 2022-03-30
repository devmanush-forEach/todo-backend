const User = require('../models/users.model');
const newToken = require('./tokenGenerater');
const {validationResult} = require('express-validator');



const signup = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).send({ errors: errors.array() })
    }

    try {
        let user;

        user = await User.findOne({ email: req.body.email }).lean().exec();

        if (user) return res.status(400).send({ message: "User with the email is already exists." })

        user = await User.create(req.body);

        const token = newToken(user);

        return res.status(201).send({ token })


    } catch (err) {
        return res.status(500).send(err.message)
    }


}


const signin = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).send({ errors: errors.array() })
    }

    try {

        let user;

        user = await User.findOne({ email: req.body.email }).exec();

        if (!user) return res.status(400).send({ message: "Please enter a valid email." });

        // console.log(user)

        const match = user.checkPassword(req.body.password);
        // const match = true;

        if (!match) return res.status(400).send({ message: "Entered password is incorrect" });

        const token = newToken(user);

        return res.status(200).send({token })


    } catch (err) {
        return res.status(500).send(err.message)
    }
}


module.exports = { signup, signin };
