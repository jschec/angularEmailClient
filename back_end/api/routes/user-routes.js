import Router from 'express';
import { validateUserQuery, registerUserQuery,
    sendNewEmalQuery } from '../controllers/user.js';

const userRouter = Router();

// Registers new email account
userRouter.get('/user/register', registerUserQuery);

// Validate user upon login
userRouter.post('/user/validate', validateUserQuery);

// Send new or reply to email
userRouter.post('/user/post/message', sendNewEmalQuery);

export default userRouter;