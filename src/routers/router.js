
const express = require('express');
const router = express.Router();
const simulacro = require('../controllers/control');
const auth = require('../middleware/auth');




router.get('/api/all/user/', auth.authenticate(),simulacro.getUser);

router.get('/api/All/users', simulacro.getUser);

router.post('/api/All/users',auth.authenticate(), simulacro.createUser);

router.post('/register',auth.authenticate(), simulacro.register);
router.post('/login',auth.authenticate(), simulacro.login);


module.exports = router;




