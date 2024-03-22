
const express = require('express');
const router = express.Router();
const simulacro = require('../controllers/control');
const auth = require('../middleware/auth');




router.get('/api/all/user', auth.authenticate(),simulacro.getUser);
router.get('/api/All/users',auth.initialize(), simulacro.getUser);
router.post('/api/All/users',auth.initialize(), simulacro.createUser);
router.delete('/api/All/users/id/:_id',simulacro.deleteUser);
router.patch('/api/All/update/nombre/:_id',simulacro.updateUser);
router.post('/register',auth.initialize(), simulacro.register);
router.post('/login',auth.initialize(), simulacro.login);


module.exports = router;




