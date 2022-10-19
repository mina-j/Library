import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route('/change').post(
    (req, res)=>new UserController().change(req, res)
)

userRouter.route('/getUser').post(
    (req, res)=>new UserController().getUser(req, res)
)

userRouter.route('/accept').post(
    (req, res)=>new UserController().accept(req, res)
)

userRouter.route('/allUsers').post(
    (req, res)=>new UserController().allUsers(req, res)
)

userRouter.route('/remove').post(
    (req, res)=>new UserController().remove(req, res)
)

userRouter.route('/update').post(
    (req, res)=>new UserController().update(req, res)
)

userRouter.route('/rok').post(
    (req, res)=>new UserController().rok(req, res)
)

userRouter.route('/getRok').get(
    (req, res)=>new UserController().getRok(req, res)
)

export default userRouter;