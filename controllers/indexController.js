import { messages } from '../data/messages.js';
import { NotFoundError } from '../errors/NotFoundError.js';

async function getMessages(req, res) {
  const messagesFromDb = await messages; // mocking db response

  if (!messagesFromDb) throw new NotFoundError('Messages not found');

  res.render('index', { title: 'Mini Messageboard', messages: messagesFromDb });
}

async function createNewMessage(req, res) {
  const messagesFromDb = await messages; // mocking db response

  if (!messagesFromDb) throw new NotFoundError('Messages not found');

  res.render('form', { title: 'New Message' });
}

export { getMessages, createNewMessage };
