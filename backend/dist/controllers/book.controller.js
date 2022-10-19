"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_1 = __importDefault(require("../models/book"));
class BookController {
    constructor() {
        this.getBooks = (req, res) => {
            book_1.default.find({}, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.getSingle = (req, res) => {
            let title = req.body.title;
            book_1.default.find({ 'title': title }, (err, book) => {
                if (err)
                    console.log(err);
                else
                    res.json(book);
            });
        };
        this.searchBooks = (req, res) => {
            let searchParam = req.body.searchParam;
            let autorParam = req.body.autorParam;
            book_1.default.find({ 'title': { $regex: new RegExp(searchParam.toLowerCase(), "i") }, 'author': { $regex: new RegExp(autorParam.toLowerCase(), "i") } }, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.randBook = (req, res) => {
            //Broj knjiga
            book_1.default.count().exec(function (err, count) {
                // random broj
                console.log(count);
                var random = Math.floor(Math.random() * count);
                book_1.default.findOne().skip(random).exec(function (err, result) {
                    // Tada! random user
                    res.json(result);
                });
            });
        };
        this.LoanedBooks = (req, res) => {
            let username = req.body.username;
            let ret = req.body.returned;
            if (ret == "") { //'person.username': username, 'person.returned': ""
                book_1.default.find({ 'person': { $elemMatch: { 'username': username, 'returned': "" } } }, (err, books) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(books);
                });
            }
            else { //'person.username': username, 'person.returned': { '$ne': "" }
                book_1.default.find({ 'person': { $elemMatch: { 'username': username, 'returned': { '$ne': "" } } } }, (err, books) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(books);
                });
            }
        };
        this.returnBook = (req, res) => {
            let title = req.body.title;
            let username = req.body.username;
            let time = req.body.time;
            //let title="Prokleta avlija";
            //let username="pera";
            // let time="2022-09-17";
            console.log(time);
            book_1.default.findOne({ 'title': title }, (err, book) => {
                if (err)
                    console.log(err);
                else {
                    console.log(book);
                    book_1.default.collection.updateOne({ 'person': { $elemMatch: { 'username': username, 'returned': "" } } }, { $set: { 'person.$.returned': time } });
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.takeBook = (req, res) => {
            let title = req.body.title;
            let username = req.body.username;
            let time = req.body.time;
            book_1.default.findOne({ 'title': title }, (err, book) => {
                if (err)
                    console.log(err);
                else {
                    let loan = {
                        username: username,
                        deadline: time,
                        returned: ""
                    };
                    book_1.default.collection.updateOne({ 'title': title }, { $push: { 'person': loan } });
                    book_1.default.collection.updateOne({ 'title': title }, { $inc: { 'num': -1 } });
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.addBook = (req, res) => {
            let book = {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                publisher: req.body.publisher,
                year: req.body.year,
                lang: req.body.lang,
                cover: req.body.cover,
                person: [Array],
                num: req.body.num,
                comments: [Array]
            };
            book_1.default.collection.insertOne(book);
            res.json({ 'message': 'ok' });
        };
        this.updateBook = (req, res) => {
            let old = req.body.naziv;
            let book = {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                publisher: req.body.publisher,
                year: req.body.year,
                lang: req.body.lang,
                cover: req.body.cover,
                num: req.body.num,
            };
            book_1.default.collection.updateOne({ 'title': old }, { $set: book });
            res.json({ 'message': 'ok' });
        };
        this.delete = (req, res) => {
            let title = req.body.title;
            book_1.default.collection.deleteOne({ 'title': title });
            res.json({ 'message': 'ok' });
        };
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map