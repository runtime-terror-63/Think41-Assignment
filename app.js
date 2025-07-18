const express = require('express');
require('dotenv').config();
require('./config/db')();
const app = express();

app.use(express.json());


app.use('/auth', require('./routes/authRoutes'));
app.use('/choices', require('./routes/choiceRoutes'));
app.use('/rules', require('./routes/ruleRoutes'));

app.use(require('./middleware/errorMiddleware'));


module.exports = app;
