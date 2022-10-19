import { Loan } from "./loan";
import {Comment} from "./comment"

export class Book{
    title: string;
    author: string;
    genre: string;
    publisher: string;
    year: number;
    lang: string;
    cover: string;
    person: Array<Loan>;
    num: number;
    comments: Array<Comment>;
    score: number;
}