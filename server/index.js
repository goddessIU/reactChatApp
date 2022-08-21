const express = require('express');
const mongoose = require('mongoose');
const messageRoutes = require('./routes/messages');
const authRoutes = require('../server/routes/auth');
const app = express();
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB Connection successful');
    }) 
    .catch(() => {
        console.log('DB connection failed');
    })

app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);

const server = app.listen(process.env.PORT, () => {
    console.log('successfully run');
});

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-receive', data.msg);
        };
    });
});