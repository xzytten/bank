// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import http from 'http';
import { Server } from "socket.io";

import authRouter from './routes/auth.js';
import transactionRouter from './routes/transaction.js';

const app = express();
const _PORT = 3003;
const _DBURL = 'mongodb+srv://user:user@cluster0.w76pyo7.mongodb.net/';
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors({ origin: '*' }));
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));
app.use('/api/auth', authRouter);
app.use('/api/transaction', transactionRouter);

async function connectDataBase(_DBURL) {
  try {
    await mongoose.connect(_DBURL);
    console.log('DB connect!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}


const userSockets = new Map();

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;

  userSockets.set(userId, socket.id);

  socket.on('disconnect', () => {
    userSockets.delete(userId);
  });
});



async function createServer() {
  try {
    await connectDataBase(_DBURL);
    server.listen(_PORT, () => {
      console.log(`Server listening on port ${_PORT}`);
    });
  } catch (error) {
    console.error('Error creating the server:', error);
  }
}

createServer();


export { io, userSockets }; 