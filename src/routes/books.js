import {BookRepository} from '../bookRepository'
import {container} from "../container";
import {ENDPOINTS} from '../endpoints/endpoints';
import express from 'express';
import {fileMulter} from '../middleware/file';
import {TEST_RESPONSE} from '../utils/utils';
import {dirname} from '../config';
import {STATUSES} from '../utils/const';
import {deleteFile} from '../utils/delete-file';

const router = express.Router()

const Book = container.get(BookRepository);

router.get(ENDPOINTS.BOOK_DOWNLOAD, async (req, res) => {
    const {id} = req.params;
    try {
        // const book = await Book.findById(id).select('-__v');
        console.log('id ', id);
        const book = await Book.getBook(id);
        console.log('book ', book);

        if (!book) {
            res.status(STATUSES.NOT_FOUND);
            res.json('404 | страница не найдена');
            return;
        }

        res.download(dirname +  '/' + book.fileBook, book.fileName);
    } catch (err) {
        res.status(STATUSES.SERVER_ERROR);
        res.json(err);
    }
})

router.post(ENDPOINTS.LOGIN, (req, res) => {
    res.json(TEST_RESPONSE);
})

router.get(ENDPOINTS.BOOKS, async (req, res) => {
    try {
        console.log({req});
        const books = await Book.getBooks();

        res.json(books);
    } catch (err) {
        res.status(STATUSES.SERVER_ERROR);
        res.json(err);
    }

})

router.get(ENDPOINTS.BOOK_ID, async (req, res) => {
    const {id} = req.params;

    try {
        const book = await Book.getBook(id);
        res.json(book);
    } catch (err) {
        res.status(STATUSES.SERVER_ERROR);
        res.json(err);
    }
})

router.post(ENDPOINTS.BOOKS, fileMulter.single('fileBook'), async (req, res) => {
    const {file} = req

    if (file) {
        const fileBook = file.path;

        try {
            const newBook = await Book.createBook({...req.body, fileBook});
            res.status(STATUSES.CREATED);
            res.json(newBook)
        } catch (err) {
            res.status(STATUSES.SERVER_ERROR);
            res.json(err);
        }
    }
})

router.put(ENDPOINTS.BOOK_ID, fileMulter.single('fileBook'), async (req, res) => {
    const {id} = req.params;

    try {
        const book = await Book.getBook(id);
        if (book) {
            const {file} = req;
            if (file) {
                deleteFile(dirname + '/' + book.fileBook);
                const fileBook = file.path;
                const fileName = file.originalname;
                await Book.updateBook(id, {
                    ...req.body,
                    fileName,
                    fileBook,
                });
            } else {
                await Book.updateBook(id, {
                    ...req.body,
                });
            }

            res.redirect(`/api/books/${id}`);
        }
    } catch (err) {
        res.status(STATUSES.SERVER_ERROR);
        res.json(err);
    }
})

router.delete(ENDPOINTS.BOOK_ID, async (req, res) => {
    const {id} = req.params

    try {
        const book = await Book.getBook(id);

        if (book) {
            await Book.deleteBook({_id: id});

            deleteFile(dirname + '/' + book.fileBook);
            res.json(true);
        }
    } catch (err) {
        res.status(STATUSES.SERVER_ERROR);
        res.json(err);
    }
})

export {router}