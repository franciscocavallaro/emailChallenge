import {UserServiceInterface} from "../interfaces/UserServiceInterface";
import {UserRepositoryInterface} from "../../repository/interfaces/UserRepositoryInterface";
import {Request, Response} from "express";
import {Role, User} from "@prisma/client";


export class UserService implements UserServiceInterface {

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

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }

        if (password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        }

        if (email && name && password) {
            const role = this.checkIfRoleWasProvided(req.body.role)
            const user = await this.userRepository.registerUser(name, email, password, role)
            if (user == undefined) {
                return null
            }
            return user
        }
        return null
    }

    private checkIfRoleWasProvided(role: string | undefined): Role {
        if (!role) {
            return Role.USER;
        }
        const lowerCaseRole = role.toLowerCase();
        if (lowerCaseRole === "admin") {
            return Role.ADMIN;
        }
        if (lowerCaseRole === "user") {
            return Role.USER;
        }
        throw new Error("Invalid role provided");
    }
}