
const express = require('express');
const bodyParser = require('body-parser');

const connectDB = require('./src/config/DB');
const routes = require('./src/routers/router');
const auth = require('./src/middleware/auth');

const app = express();

const  port = 3000;

connectDB();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(auth.initialize());

app.use('/',routes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});










