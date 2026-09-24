import { messages } from '../data/messages.js';
import { NotFoundError } from '../errors/NotFoundError.js';

async function getMessages(req, res) {
  const messagesFromDb = await messages; // mocking db response

  if (!messagesFromDb) throw new NotFoundError('Messages not found');

  res.render('index', {
    title: 'Mini Messageboard',
    messages: messagesFromDb,
    formatDate,
  });
}

async function createNewMessage(req, res) {
  // const messagesFromDb = await messages; // mocking db response

  // if (!messagesFromDb) throw new NotFoundError('Messages not found');

  res.render('form', { title: 'New Message' });
}

async function postNewMessage(req, res) {
  const { author, msg } = req.body;
  messages.push({
    user: author,
    text: msg,
    added: new Date(),
    id: Math.floor(Math.random() * 1000000000),
  });
  res.redirect('/');
}

async function messageDetails(req, res) {
  const { id } = req.params;
  const message = messages.find((msg) => msg.id === id);
  res.render('/msg');
}

function formatDate(date) {
  return date
    .toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    .replace(/,/g, ' ');
}

export { getMessages, createNewMessage, postNewMessage };
