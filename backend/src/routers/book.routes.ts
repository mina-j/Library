import express from 'express';
import { textSpanIntersectsWith } from 'typescript';
import { BookController } from '../controllers/book.controller'

const bookRouter = express.Router();

bookRouter.route('/getBooks').get(
    (req, res)=>new BookController().getBooks(req,res)
)

bookRouter.route('/getSingle').post(
    (req, res)=>new BookController().getSingle(req,res)
)

bookRouter.route('/search').post(
    (req, res)=>new BookController().searchBooks(req, res)
)

bookRouter.route('/randBook').get(
    (req, res)=>new BookController().randBook(req, res)
)

bookRouter.route('/loaned').post(
    (req, res)=>new BookController().LoanedBooks(req, res)
)

bookRouter.route('/returnBook').post(
    (req, res)=>new BookController().returnBook(req, res)
)

bookRouter.route('/takeBook').post(
    (req, res)=>new BookController().takeBook(req, res)
)

bookRouter.route('/addBook').post(
    (req, res)=>new BookController().addBook(req, res)
)

bookRouter.route('/updateBook').post(
    (req, res)=>new BookController().updateBook(req, res)
)

bookRouter.route('/delete').post(
    (req, res)=>new BookController().delete(req, res)
)

export default bookRouter;