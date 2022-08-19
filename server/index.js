const express = require('express');
const mongoose = require('mongoose');
const app = express();
const socket = require('socket.io');
require('dotenv').config();

const server = app.listen(process.env.PORT, () => {
    console.log('successfully run');
});

