import express from 'express';
import {
  getMessages,
  createNewMessage,
  postNewMessage,
  messageDetails,
} from '../controllers/indexController.js';

const indexRouter = express.Router();

indexRouter.get('/:id', messageDetails);

indexRouter.get('/new', createNewMessage);

indexRouter.post('/new', postNewMessage);

indexRouter.get('/', getMessages);

export { indexRouter };
