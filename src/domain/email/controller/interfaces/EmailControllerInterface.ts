import {EmailServiceInterface} from "../../service/interfaces/EmailServiceInterface";
import {Request, Response} from "express";

export interface EmailControllerInterface {

    emailService: EmailServiceInterface;

    sendEmail(req: Request, res: Response): any;
}