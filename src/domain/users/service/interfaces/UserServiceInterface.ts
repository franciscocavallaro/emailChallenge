import { Request, Response} from "express";
import { User } from '@prisma/client';
import {UserRepositoryInterface} from "../../repository/interfaces/UserRepositoryInterface";

export interface UserServiceInterface {

    userRepository: UserRepositoryInterface

    registerUser(req: Request, res: Response) : Promise<User | null>
    loginUser(req: Request, res: Response) : Promise<User | null>
}

