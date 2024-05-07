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
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const role = req.body.role;
        try {
            const response = await this.userService.userRepository.registerUser(name, email, password, role);
            if (response == null) {
                res.status(400).json({message: 'User with that email already exists'})
            } else {
                res.status(201).json({message: 'User registered successfully', user: response});
            }
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

}