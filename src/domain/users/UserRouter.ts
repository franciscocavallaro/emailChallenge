import {Router} from "express";
import {UserService} from "./service/implementations/UserService";
import {UserRepository} from "./repository/implementations/UserRepository";
import {UserController} from "./controller/implementations/UserController";
import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";

const userRouter = Router();

const prismaClient = new PrismaClient();
const userRepository = new UserRepository(prismaClient);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post("/loginUser", (req: Request, res: Response) => {
    res.json(userController.loginUser(req, res));
});

userRouter.post("/registerUser", (req: Request, res: Response) => {
    res.json(userController.registerUser(req, res));
});

export default userRouter;