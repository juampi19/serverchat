import { MoreThan } from 'typeorm';

export const saveMessage = async (messageRepository, content, user) => {
  const message = messageRepository.create({ content, user });
  return await messageRepository.save(message);
};

export const getMessagesSince = async (messageRepository, id) => {
  return await messageRepository.find({ where: { id: MoreThan(id) } });
};