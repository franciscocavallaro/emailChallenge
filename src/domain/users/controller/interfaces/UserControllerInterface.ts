import { Request, Response } from "express";
import {UserServiceInterface} from "../../service/interfaces/UserServiceInterface";

export interface UserControllerInterface {

    userService: UserServiceInterface

    registerUser(req: Request, res: Response) : any
    loginUser(req: Request, res: Response) : any
}