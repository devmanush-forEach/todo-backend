const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (token) =>{

    return new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded){
            if(err) return reject(err)

            resolve(decoded);
        })
    })
}



module.exports = async (req, res, next)=>{

    if(!req.headers?.authorization) return res.status(400).send('Please provide a valid authorization token');

    const bearerToken = req.headers.authorization;

    if(!bearerToken.startsWith('Bearer '))  return res.status(400).send('Please provide a valid authorization token');

    const token = bearerToken.split(" ")[1];

    let user;

    try {
        user = await verifyToken(token);
        
    } catch (err) {
        return res.status(400).send('Please provide a valid authorization token');
    }

    req.user =  user.user;
    // console.log(req.user);


    return next();
}