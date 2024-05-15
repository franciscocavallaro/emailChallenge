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

    async loginUser(req: Request, res: Response): Promise<string | any> {
        const email = req.body.email
        const password = req.body.password
        try {
            const user = await this.userService.userRepository.loginUser(email, password)
            if (user != null) {
                const token = Token.generateToken(user)
                return {token}
            }
        } catch (error) {
            res.status(400)
        }
    }

    async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.userService.registerUser(req, res);
            if (response == null) {
                res.status(400).json({message: 'User with that email already exists'})
            } else {
                res.status(201).json({message: 'User registered successfully', user: response});
            }
        } catch (error) {
            res.status(500).json({error: (error as Error).message});
        }
    }

}