const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require('./routes/auth.route');
const musicRoute = require('./routes/music.route');


    
let app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/music', musicRoute);

module.exports = app;