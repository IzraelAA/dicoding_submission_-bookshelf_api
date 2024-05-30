import express from 'express';
import {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
} from '../handlers/booksHandler.js';

const router = express.Router();

router.post('/', addBookHandler);
router.get('/', getAllBooksHandler);
router.get('/:bookId', getBookByIdHandler);
router.put('/:bookId', updateBookByIdHandler);
router.delete('/:bookId', deleteBookByIdHandler);

export default router;
