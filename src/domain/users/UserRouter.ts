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

userRouter.post("/loginUser", async (req: Request, res: Response) => {
    try {
        const token = await userController.loginUser(req, res);
        if (token) {
            res.status(200).json(token);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error});
    }
});

userRouter.post("/registerUser", async (req: Request, res: Response) => {
    try {
        await userController.registerUser(req, res);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


export default userRouter;