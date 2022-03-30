const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const userSchema = new mongoose.Schema({
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    roles : [{type : String, required : true}],
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();
    try {
        this.password = bcrypt.hashSync(this.password, 8);
        return next()

    } catch (err) {
        next(err);
    }


})

userSchema.methods = {

    checkPassword: function (password) {
        return bcrypt.compareSync(password, this.password);
    }
}
module.exports = mongoose.model('user', userSchema);