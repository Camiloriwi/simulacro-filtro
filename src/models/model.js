
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId:{type: 'number'},
    name:{type:'string'},
    email:{type:'string'},
    password:{type: 'string'},
});


const user = mongoose.model('users', userSchema);

module.exports = user;