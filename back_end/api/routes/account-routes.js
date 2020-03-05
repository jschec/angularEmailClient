import Router from 'express';
import { getAccountsQuery, updateAccountQuery } from '../controllers/account.js';

const accountRouter = Router();

// Update user account
accountRouter.put('/user/put/:id/account', updateAccountQuery);

// Fetches user account info for settings
accountRouter.get('/user/get/:id/account', getAccountsQuery);

export default accountRouter;