import {UserControllerInterface} from "../interfaces/UserControllerInterface";
import {UserServiceInterface} from "../../service/interfaces/UserServiceInterface";
import {Request, Response} from "express";

export class UserController implements UserControllerInterface {

    userService: UserServiceInterface;

    constructor(userService: UserServiceInterface) {
        this.userService = userService
    }

    loginUser(req: Request, res: Response): any {
        const email = req.body.email
        const password = req.body.password
        try {
            const user = this.userService.userRepository.loginUser(email, password)
            //token missing to log the user
        } catch (error) {
            throw new Error(res.statusMessage)
        }
    }

    registerUser(req: Request, res: Response): any {
        const email = req.body.email
        const password = req.body.password
        const name = req.body.name
        try {
            const response = this.userService.userRepository.registerUser(name, email, password)
            return res.status(201).json(response)
        }
        catch (error) {
            throw new Error(res.statusMessage)
        }
    }

}