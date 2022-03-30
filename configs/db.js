const mongoose = require('mongoose');

require('dotenv').config();

module.exports = ()=>{
    let db_url = process.env.DB_URL;
    console.log(db_url);
    return mongoose.connect(db_url)
}