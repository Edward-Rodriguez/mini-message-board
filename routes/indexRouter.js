import express from 'express';
import { getMessages } from '../controllers/indexController.js';

const indexRouter = express.Router();

indexRouter.get('/', getMessages);

export { indexRouter };
