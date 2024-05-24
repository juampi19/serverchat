import { handleConnection, handleDisconnect, handleMessage } from "../controller/chat.controller.js"

export const chatRoutes = (io, messageRepository) => {
  io.on('connection', (socket) => {
    handleConnection(io, socket);

    socket.on('disconnect', () => handleDisconnect(socket));
    socket.on('chat message', (payload) => handleMessage(socket, payload, messageRepository))
  })
}