import express from 'express';
import {
  getMessages,
  createNewMessage,
} from '../controllers/indexController.js';

const indexRouter = express.Router();

indexRouter.get('/new', createNewMessage);

indexRouter.get('/', getMessages);

export { indexRouter };
