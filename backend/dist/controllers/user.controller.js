"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            let user = new user_1.default({ firstname: req.body.firstname, lastname: req.body.lastname,
                username: req.body.username, password: req.body.password, address: req.body.address, tel: req.body.tel, email: req.body.email, picture: req.body.picture, type: req.body.type, accepted: req.body.accepted });
            //let user = new User(req.body)
            user.save().then(user => {
                res.status(200).json({ 'message': 'user added' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
        this.change = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let newpass = req.body.newpass;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        console.log(username);
                        user_1.default.collection.updateOne({ 'username': username }, { $set: { 'password': newpass } });
                        res.json({ 'message': 'ok' });
                    }
                    else {
                        res.json({ 'message': 'Pogresna lozinka!' });
                    }
                }
            });
        };
        this.getUser = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, mod) => {
                if (err)
                    console.log(err);
                else
                    res.json(mod);
            });
        };
        this.accept = (req, res) => {
            let username = req.body.username;
            let num = req.body.num;
            user_1.default.collection.updateOne({ 'username': username }, { $set: { 'accepted': num } });
            res.json({ 'message': 'ok' });
        };
        this.allUsers = (req, res) => {
            let num = req.body.num;
            user_1.default.find({ 'accepted': num }, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.remove = (req, res) => {
            let username = req.body.username;
            user_1.default.collection.deleteOne({ 'username': username });
            res.json({ 'message': 'ok' });
        };
        this.update = (req, res) => {
            let user = { firstname: req.body.firstname, lastname: req.body.lastname,
                username: req.body.username, address: req.body.address, tel: req.body.tel, email: req.body.email, picture: req.body.picture, type: req.body.type };
            let old = req.body.old;
            user_1.default.collection.updateOne({ 'username': old }, { $set: user });
            res.json({ 'message': 'ok' });
        };
        this.rok = (req, res) => {
            let day = req.body.day;
            user_1.default.collection.updateOne({ 'type': "admin" }, { $set: { 'accepted': day } });
            res.json({ 'message': 'ok' });
        };
        this.getRok = (req, res) => {
            user_1.default.findOne({ 'type': "admin" }, (err, mod) => {
                if (err)
                    console.log(err);
                else
                    res.json(mod);
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map