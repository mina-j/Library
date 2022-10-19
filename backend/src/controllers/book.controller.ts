import { generateKey } from 'crypto';
import * as express from 'express';
import { LanguageVariant, parseJsonSourceFileConfigFileContent } from 'typescript';
import Book from '../models/book'

export class BookController{
    getBooks=(req: express.Request, res: express.Response)=>{
        Book.find({},(err,books)=>{
            if(err) console.log(err);
            else res.json(books);
        })
    }

    getSingle=(req: express.Request, res: express.Response)=>{
        let title=req.body.title;
        Book.find({'title': title},(err,book)=>{
            if(err) console.log(err);
            else res.json(book);
        })
    }

    searchBooks = (req: express.Request, res: express.Response)=>{

       let searchParam=req.body.searchParam;
       let autorParam=req.body.autorParam;

        Book.find({'title': {$regex: new RegExp(searchParam.toLowerCase(), "i")},'author': {$regex: new RegExp(autorParam.toLowerCase(), "i")}}, (err, books)=>{
            if(err) console.log(err);
            else res.json(books);
        }) 
    }

    randBook = (req: express.Request, res: express.Response) => {
        //Broj knjiga
        Book.count().exec(function (err, count) {
            // random broj
            console.log(count);
            var random = Math.floor(Math.random() * count)
            
            Book.findOne().skip(random).exec(
                function (err, result) {
                    // Tada! random user
                    res.json(result)
                })
        })         

        
    }

    LoanedBooks = (req: express.Request, res: express.Response)=>{ 
        let username=req.body.username;
        let ret=req.body.returned;
        if(ret==""){//'person.username': username, 'person.returned': ""
            
        Book.find({'person': { $elemMatch: { 'username': username, 'returned': "" } } },(err,books)=>{
            if(err) console.log(err);
            else res.json(books);
        })
    }else{//'person.username': username, 'person.returned': { '$ne': "" }
    Book.find({'person': { $elemMatch: { 'username': username, 'returned': { '$ne': "" } } }},(err,books)=>{
            if(err) console.log(err);
            else res.json(books);
        })
    }
     }


     returnBook = (req: express.Request, res: express.Response)=>{ 
        let title=req.body.title;
        let username=req.body.username;
        let time=req.body.time;
        //let title="Prokleta avlija";
        //let username="pera";
       // let time="2022-09-17";
        console.log(time);

        Book.findOne({'title': title},(err,book)=>{
            if(err) console.log(err);
            else {
                console.log(book);
                Book.collection.updateOne({'person': { $elemMatch: { 'username': username, 'returned': "" } } },{$set: {'person.$.returned': time}});
                res.json({'message': 'ok'});
            }
        })
       
     }

     takeBook = (req: express.Request, res: express.Response)=>{
        let title=req.body.title;
        let username=req.body.username;
        let time=req.body.time;

        Book.findOne({'title': title},(err,book)=>{
            if(err) console.log(err);
            else {
                let loan = {
                    username: username,
                    deadline: time,
                    returned: ""
                }
                Book.collection.updateOne({'title': title}, {$push: {'person': loan}});
                Book.collection.updateOne({'title': title},{$inc: {'num': -1}});   
                res.json({'message': 'ok'});
            }
        })

     }

    addBook = (req: express.Request, res: express.Response) => {
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
        }

        Book.collection.insertOne( book);
        res.json({ 'message': 'ok' });

    }

    updateBook = (req: express.Request, res: express.Response) => {
        let old=req.body.naziv
        let book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publisher: req.body.publisher,
            year: req.body.year,
            lang: req.body.lang,
            cover: req.body.cover,
            num: req.body.num,
        }

        Book.collection.updateOne({'title': old },{$set: book});
        res.json({ 'message': 'ok' });

    }

    delete = (req: express.Request, res: express.Response) => {
        let title=req.body.title;
        Book.collection.deleteOne({'title': title}); 
        res.json({'message': 'ok'})

    }


}