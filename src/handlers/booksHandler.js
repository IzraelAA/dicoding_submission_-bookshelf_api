import { nanoid } from 'nanoid';

const books = [];

export const addBookHandler = (req, res) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
    }

    const id = nanoid();
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
    };

    books.push(newBook);

    res.status(201).json({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
    });
};

export const getAllBooksHandler = (req, res) => {
    const { name, reading, finished } = req.query;
    let filteredBooks = books;

    if (name) {
        filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (reading !== undefined) {
        filteredBooks = filteredBooks.filter((book) => book.reading === (reading === '1'));
    }

    if (finished !== undefined) {
        filteredBooks = filteredBooks.filter((book) => book.finished === (finished === '1'));
    }

    const responseBooks = filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));

    res.status(200).json({
        status: 'success',
        data: {
            books: responseBooks,
        },
    });
};

export const getBookByIdHandler = (req, res) => {
    const { bookId } = req.params;
    const book = books.find((b) => b.id === bookId);

    if (!book) {
        return res.status(404).json({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            book,
        },
    });
};

export const updateBookByIdHandler = (req, res) => {
    const { bookId } = req.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;
    const index = books.findIndex((b) => b.id === bookId);

    if (index === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
    }

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
    }

    const updatedAt = new Date().toISOString();
    const finished = pageCount === readPage;

    books[index] = {
        ...books[index],
        name, year, author, summary, publisher, pageCount, readPage, reading, finished, updatedAt,
    };

    res.status(200).json({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    });
};

export const deleteBookByIdHandler = (req, res) => {
    const { bookId } = req.params;
    const index = books.findIndex((b) => b.id === bookId);

    if (index === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
    }

    books.splice(index, 1);

    res.status(200).json({
        status: 'success',
        message: 'Buku berhasil dihapus',
    });
};
