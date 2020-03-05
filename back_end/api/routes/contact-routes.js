import Router from 'express';
import { enterContactQuery, getContactsQuery,
    getContactQuery, updateContactQuery, 
    deleteContactQuery
 } from '../controllers/contact.js';

const contactRouter = Router();

// Create new contact
contactRouter.post('/post/contact', enterContactQuery);

// Fetch all contacts based on user's id
contactRouter.get('/contacts/get/:id', getContactsQuery);

// Use user's id and contact's email as primary key to fetch contact's details
contactRouter.get('/contact/:id/get/:email', getContactQuery);

// Update contact's info using user's id and contact's email in where statement
contactRouter.put('/contact/:id/put/:email', updateContactQuery);

// Delete contact based on user's id and contact's email
contactRouter.delete('/contact/:id/delete/:email', deleteContactQuery);

export default contactRouter;