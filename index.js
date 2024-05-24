import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import "reflect-metadata"
import { AppDataSource } from './config/data-source.js';

import cors from 'cors'
import { UserSchema } from './entities/user.entity.js';
import { MessageSchema } from './entities/message.entity.js';

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

const userRepository = AppDataSource.getRepository(UserSchema);
const messageRepository = AppDataSource.getRepository(MessageSchema);

AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');


  server.listen(3000, () => {
    console.log('server is running on port 3000')
  })
}).catch((err) =>  {
  console.error('Error during data source', err)
})


io.on('connection', (socket) => {
  console.log('a user has connected');

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('message', async({msg, room }) => {
    const user = socket.handshake.auth.name ?? 'anonymous';
    console.log({user, msg, room })

    try {
      
      
      io.to(room).emit('message', {user, msg})
    } catch (error) {
      console.log(error)
    }

  })

})

app.post('/api/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await userRepository.findOne({ where: { name, password } });
    console.log(user)
    if (user) {
      res.json({ user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/users', async (req, res) => {
  const { name, password } = req.body;
  console.log(req.body)
  const userRepository = AppDataSource.getRepository(UserSchema);

  try {
    const existingUser = await userRepository.findOne({ where: { name } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = userRepository.create({ name, password });
    await userRepository.save(user);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});
