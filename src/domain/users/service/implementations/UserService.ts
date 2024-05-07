import {UserServiceInterface} from "../interfaces/UserServiceInterface";
import {UserRepositoryInterface} from "../../repository/interfaces/UserRepositoryInterface";
import {Request, Response} from "express";
import {User} from "@prisma/client";


export class UserService implements UserServiceInterface{

    userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository
    }

    async loginUser(req: Request, res: Response): Promise<User | null> {
        const email = req.body.email
        const password = req.body.password
        if (email && password) {
            const user = await this.userRepository.loginUser(email, password);
            if (user == undefined) {
                throw new Error("Login unsuccessful")
            }
            return user;
        }
        return null
    }

    async registerUser(req: Request, res: Response): Promise<User | null> {
        const email = req.body.email
        const name = req.body.name
        const password = req.body.password
        const role = req.body.role
        if (email && name && password && role) {
            const user = await this.userRepository.registerUser(name, email, password, role)
            if (user == undefined) {
                throw new Error("Register unsuccessful")
            }
            return user
        }
        return null
    }

}