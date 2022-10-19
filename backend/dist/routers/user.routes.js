"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/change').post((req, res) => new user_controller_1.UserController().change(req, res));
userRouter.route('/getUser').post((req, res) => new user_controller_1.UserController().getUser(req, res));
userRouter.route('/accept').post((req, res) => new user_controller_1.UserController().accept(req, res));
userRouter.route('/allUsers').post((req, res) => new user_controller_1.UserController().allUsers(req, res));
userRouter.route('/remove').post((req, res) => new user_controller_1.UserController().remove(req, res));
userRouter.route('/update').post((req, res) => new user_controller_1.UserController().update(req, res));
userRouter.route('/rok').post((req, res) => new user_controller_1.UserController().rok(req, res));
userRouter.route('/getRok').get((req, res) => new user_controller_1.UserController().getRok(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map