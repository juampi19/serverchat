import { saveMessage, getMessagesSince } from "../service/chat.service.js";

const users = new Map();

export const handleConnection = (io, socket) => {
  const userId = socket.handshake.query.id;
  users.set(userId, socket);
  console.log(`User ${userId} connected`);
};


export const handleDisconnect = (socket) => {
  const userId = socket.handshake.query.id;
  users.delete(userId);
  console.log(`User ${userId} disconnected`);
};

export const handleMessage = async (socket, payload, messageRepository) => {
  const userId = socket.handshake.query.id;
  const { msg, recipientId } = payload;

  const savedMessage = await saveMessage(messageRepository, msg, userId);

  const recipientSocket = users.get(recipientId);
  if (recipientSocket) {
    recipientSocket.emit('chat message', msg, savedMessage.id, userId);
  } else {
    console.log(`User ${recipientId} not connected`);
  }
};