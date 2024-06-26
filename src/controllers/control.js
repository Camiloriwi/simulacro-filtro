
const user = require('../models/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = "##%dasdsadasd##"; 


const simulacro ={


    getUser: async (req, res)=>{

        try {

            const users = await user.find();
            res.json({
                query:'OK',
                success: true,
                status: 201,
                message: 'Conexión exitosa al puerto 3000, consulta realizada: /api users',
                data: users
            });

            
        } catch (error) {

            res.status(500).json({
                query:'failed',
                success: false,
                status: 500,
                message: 'Hubo un error al realizar la consulta /api/users',
                error: error.message
            });
        };

    },




    createUser: async (req, res)=>{

        try {
            
            const newUser = new user({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })


            await newUser.save();
            res.json({
                query:'OK',
                success: true,
                status: 201,
                message: 'Conexión exitosa al puerto 3000, consulta realizada: /api users',
                data: newUser
            });

        } catch (error) {
            res.status(500).json({
                query:'failed',
                success: false,
                status: 500,
                message: 'Hubo un error al realizar la creacion del user: /api/users/new',
                error: error.message
            });
        }
    },




    deleteUser:  async (req, res) =>{
        try {
            const id = req.params._id;
            const users = await user.findByIdAndDelete({_id:id});
            res.json({
                query:'OK',
                success: true,
                status: 201,
                message: 'Conexión exitosa al puerto 3000, consulta realizada: /api users',
                data: users
            });
            
        } catch (error) {
            res.status(500).json({
                query:'failed',
                success: false,
                status: 500,
                message: 'Hubo un error al realizar la eliminacion del user: /api/users/delete',
                error: error.message
            });
    
        };

    },

    updateUsers: async (req, res) => {
        try {
            const id = req.params._id;
            const updateData = req.body; // Aquí capturamos los datos enviados desde el formulario
    

            const users = await user.findByIdAndUpdate(id, updateData, { new: true });
    
            res.json({
                query: 'OK',
                success: true,
                status: 201,
                message: 'Conexión exitosa al puerto 3000, consulta realizada: /api users',
                data: users
            });
    
        } catch (error) {
            res.status(500).json({
                query: 'failed',
                success: false,
                status: 500,
                message: 'Hubo un error al realizar la actualizacion del user: /api/users/update',
                error: error.message
            });
        };
    },
    

    updateUser:  async (req, res)=>{
        try {
            const id = req.params._id;
            const users = await user.findByIdAndUpdate({_id:id},{name:'cristian'}, req.body);
            res.json({
                query:'OK',
                success: true,
                status: 201,
                message: 'Conexión exitosa al puerto 3000, consulta realizada: /api users',
                data: users
            });
            
        } catch (error) {
            res.status(500).json({
                query:'failed',
                success: false,
                status: 500,
                message: 'Hubo un error al realizar la actualizacion del user: /api/users/update',
                error: error.message
            });
        };

    },

    register: async (req,res)=>{

        try {
            const users = await user.find();
            const {name,email ,password} = req.body;

            const  userData = {
                userId:users.length +1,
                name: name,
                email: email,
                password: await bcrypt.hash(password,10),

            }

            const  newUser = new user(userData);
            await newUser.save();
            res.json({
                query:'OK',
                success: true,
                status: 201,
                message: 'Conexión exitosa al puerto 3000, consulta realizada: /api users',
                data: newUser
            });

            
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).json({
                query:'failed',
                success: false,
                status: 500,
                message: 'Internal Server Error'
            });
        }
    },




    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const users = await user.find({ email: email });
    
            if (users.length === 0) {
                return res.status(400).json({
                    message: 'Invalid username or password. Please try again.'
                });
            }
    
            const isPasswordValid = await bcrypt.compare(password, users[0].password);
    
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid username or password" });
            }
    
            const token = jwt.sign({ userId: users[0]._id }, jwt_secret, {
                expiresIn: 3600
            });
    
            res.json({
                query: 'OK',
                success: true,
                status: 201,
                message: 'User logged in successfully',
                data: token
            });
    
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({
                query: 'failed',
                success: false,
                status: 500,
                message: 'Internal Server Error'
            });
        }
    }
    


};













module.exports = simulacro;





















