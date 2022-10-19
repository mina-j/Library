import * as express from 'express';
import User from '../models/user'

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let user = new User({firstname: req.body.firstname, lastname: req.body.lastname,
                username: req.body.username, password: req.body.password, address: req.body.address, tel: req.body.tel, email: req.body.email, picture: req.body.picture, type: req.body.type ,accepted: req.body.accepted})

        //let user = new User(req.body)

        user.save().then(user=>{
            res.status(200).json({'message': 'user added'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'})
        })
    }

    change = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let newpass = req.body.newpass;

        User.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err) console.log(err);
            else {
                if(user){
                    console.log(username);
                    User.collection.updateOne({'username':username}, {$set:{'password':newpass}});
                    res.json({'message': 'ok'})
                }
                else{
                    res.json({'message': 'Pogresna lozinka!'})
                }
            }
        })
    }

    getUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        User.findOne({'username': username}, (err, mod)=>{
            if(err) console.log(err);
            else res.json(mod)
        })


    }

    accept = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let num=req.body.num;

        User.collection.updateOne({'username': username},{$set: {'accepted': num}}); 
        res.json({'message': 'ok'})
    }

    allUsers = (req: express.Request, res: express.Response)=>{
        let num=req.body.num;
        User.find({'accepted':num},(err,users)=>{
            if(err) console.log(err);
            else res.json(users);
        })
    }

    remove= (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        User.collection.deleteOne({'username': username}); 
        res.json({'message': 'ok'})
    }

    update= (req: express.Request, res: express.Response)=>{
        let user ={firstname: req.body.firstname, lastname: req.body.lastname,
            username: req.body.username, address: req.body.address, tel: req.body.tel, email: req.body.email, picture: req.body.picture, type: req.body.type}

    
        let old=req.body.old;

        User.collection.updateOne({'username':old},{$set: user}); 
        res.json({'message': 'ok'})
    }

    rok= (req: express.Request, res: express.Response)=>{
    
        let day=req.body.day;

        User.collection.updateOne({'type':"admin"},{$set: {'accepted': day}}); 
        res.json({'message': 'ok'})
    }

    getRok= (req: express.Request, res: express.Response)=>{
        User.findOne({'type': "admin"}, (err, mod)=>{
            if(err) console.log(err);
            else res.json(mod)
        })
    
        
    }





}