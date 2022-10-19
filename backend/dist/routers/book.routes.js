"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const bookRouter = express_1.default.Router();
bookRouter.route('/getBooks').get((req, res) => new book_controller_1.BookController().getBooks(req, res));
bookRouter.route('/getSingle').post((req, res) => new book_controller_1.BookController().getSingle(req, res));
bookRouter.route('/search').post((req, res) => new book_controller_1.BookController().searchBooks(req, res));
bookRouter.route('/randBook').get((req, res) => new book_controller_1.BookController().randBook(req, res));
bookRouter.route('/loaned').post((req, res) => new book_controller_1.BookController().LoanedBooks(req, res));
bookRouter.route('/returnBook').post((req, res) => new book_controller_1.BookController().returnBook(req, res));
bookRouter.route('/takeBook').post((req, res) => new book_controller_1.BookController().takeBook(req, res));
bookRouter.route('/addBook').post((req, res) => new book_controller_1.BookController().addBook(req, res));
bookRouter.route('/updateBook').post((req, res) => new book_controller_1.BookController().updateBook(req, res));
bookRouter.route('/delete').post((req, res) => new book_controller_1.BookController().delete(req, res));
exports.default = bookRouter;
//# sourceMappingURL=book.routes.js.map