import express from 'express';
import booksRoutes from './routes/books.js';

const app = express();
const port = 9000;

app.use(express.json());
app.use('/books', booksRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
