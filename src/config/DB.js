
const mongoose = require('mongoose');

let user;

const connectDB = async ()=>{
    
    try {

        if(!user){
            user = mongoose.model('users', require('../models/model').Schema) 
        }
        await mongoose.connect('mongodb+srv://camilo:nFgFrb0li3JxbLr6@node.ktvwioe.mongodb.net/')
        .then(()=>{console.log('connected to database')})
        .catch(err=>{console.log(err)});

        await initData();
        
    } catch (error) {
        console.error('failed to connect database', error);
        process.exit(1);
        
    }
};



const initData = async ()=>{

    try {

        console.log('conection successfully initialized');
    } catch (error) {
        console.error('failed to initialize database mongodb', error);
        process.exit(1);    
    }
}


module.exports = connectDB;

















