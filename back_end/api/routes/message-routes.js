import Router from 'express';
import { getMessagePathQuery, 
    getEmailMessagesQuery } from '../controllers/message.js';

const messageRouter = Router();

// Fetch messages based on user's id
messageRouter.get('/user/get/:id/messages', getEmailMessagesQuery);

// Fetches specific email message and its html
messageRouter.get('/user/get/:id/message/:message_id', getMessagePathQuery);

export default messageRouter;