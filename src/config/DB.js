
// Importa el módulo mongoose, que proporciona una solución directa basada en esquemas para modelar los datos de su aplicación.
const mongoose = require('mongoose');

// Declara una variable de usuario que se utilizará para almacenar el modelo de usuario.
let user;

// Define una función asíncrona para conectar a la base de datos.
const connectDB = async ()=>{
    
    try {
        // Si el modelo de usuario aún no se ha creado, lo crea.
        if(!user){
            user = mongoose.model('users', require('../models/model').Schema) 
        }
        // Intenta conectar a la base de datos. Si la conexión es exitosa, imprime un mensaje en la consola.
        await mongoose.connect('mongodb+srv://camilo:nFgFrb0li3JxbLr6@node.ktvwioe.mongodb.net/')
        .then(()=>{console.log('connected to database')})
        .catch(err=>{console.log(err)});

        // Llama a la función initData para inicializar los datos en la base de datos.
        await initData();
        
    } catch (error) {
        // Si hay un error al conectar a la base de datos, imprime el error en la consola y termina el proceso.
        console.error('failed to connect database', error);
        process.exit(1);
        
    }
};

// Define una función asíncrona para inicializar los datos en la base de datos.
const initData = async ()=>{

    try {
        // Si la inicialización es exitosa, imprime un mensaje en la consola.
        console.log('conection successfully initialized');
    } catch (error) {
        // Si hay un error al inicializar los datos, imprime el error en la consola y termina el proceso.
        console.error('failed to initialize database mongodb', error);
        process.exit(1);    
    }
}

// Exporta la función connectDB para que pueda ser utilizada en otras partes de la aplicación.
module.exports = connectDB;


