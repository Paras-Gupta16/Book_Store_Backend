import express from 'express';
import { registerBook, getBooks, issueBook,returnBook,searchBook } from '../controller/bookController.js';

const bookRoutes = express.Router();

bookRoutes.post('/register', registerBook);
bookRoutes.get('/get', getBooks);
bookRoutes.put('/issue', issueBook);
bookRoutes.put('/return', returnBook);
bookRoutes.get('/:id',searchBook);

export default bookRoutes;