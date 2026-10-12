import { NotFoundError } from '../errors/NotFoundError.js';
import * as db from '../db/queries.js';
import { validationResult, body, query, matchedData } from 'express-validator';

const alphaErr = 'must only contain letters';
const msgErr = 'Please include a message. It cannot be empty.';
const lengthErr = (length) => 'must be between 1 and ' + length + ' characters';

const validatorUsername = [
  body('author')
    .trim()
    .isAlpha()
    .withMessage(`Author name ${alphaErr}`)
    .isLength({ min: 1, max: 24 })
    .withMessage(`Author name ${lengthErr(24)}`),
  body('msg')
    .trim()
    .notEmpty()
    .withMessage(msgErr)
    .isLength({ min: 1, max: 200 })
    .withMessage(`Message ${lengthErr(200)}`),
];

async function getMessages(req, res) {
  const messagesFromDb = await db.getAllmessages(); // mocking db response

  if (!messagesFromDb) throw new NotFoundError('Messages not found');

  res.render('index', {
    title: 'Mini Messageboard',
    messages: messagesFromDb,
    formatDate,
  });
}

async function createNewMessage(req, res) {
  res.render('form', { title: 'New Message' });
}

const postNewMessage = [
  validatorUsername,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('form', {
        title: 'New Message',
        errors: errors.array(),
      });
    }

    const { author, msg } = matchedData(req);

    await db.addNewMessage(author, msg);
    res.redirect('/');
  },
];

async function messageDetails(req, res) {
  const { id } = req.params;
  const message = await db.getMessageById(Number(id));
  const replies = await db.getReplies(Number(id));
  console.log(message);

  if (!message) throw new NotFoundError('Message not found!');

  res.render('msgDetails', {
    title: message.text,
    message: message,
    replies: replies,
    formatDate,
  });
}

function formatDate(date) {
  return new Date(date)
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

export { getMessages, createNewMessage, postNewMessage, messageDetails };
