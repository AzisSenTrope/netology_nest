const {initBooks} = require('../utils/utils');
const {connect} = require('mongoose')

import express from 'express';
import {router as bookRouter} from '../routes/books';
import {ENDPOINTS} from '../endpoints/endpoints';

export async function runServer(port, urlDB) {
    try {
        await connect(urlDB);
        await initBooks();
        const app = express();
        app.use(express.json());
        app.use(ENDPOINTS.API, bookRouter);

        app.listen(port)
        console.log('Сервер запущег')
    } catch (err) {
        console.log('Не удалось запустить сервер ', err);
    }
}
