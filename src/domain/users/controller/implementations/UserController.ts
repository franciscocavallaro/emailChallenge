import {UserControllerInterface} from "../interfaces/UserControllerInterface";
import {UserServiceInterface} from "../../service/interfaces/UserServiceInterface";
import {Request, Response} from "express";
import {Token} from "../../../../token/Token";
import Router from "../../../../router/Router";

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
            if (user != null) {
                const token = Token.generateToken(user)
                return res.status(200).json({token: token})
            }
        } catch (error) {
            throw new Error(res.statusMessage)
        }
    }

    registerUser(req: Request, res: Response): any {
        console.log(req.body)
        const email = req.body.email
        const password = req.body.password
        const name = req.body.name
        const role = req.body.role
        try {
            const response = this.userService.userRepository.registerUser(name, email, password, role)
            return res.status(201).json(response)
        } catch (error) {
            throw new Error(res.statusMessage)
        }
    }

}