import {EmailControllerInterface} from "../interfaces/EmailControllerInterface";
import {EmailServiceInterface} from "../../service/interfaces/EmailServiceInterface";
import {Request, Response} from "express";
import {Mail} from "@prisma/client";

export class EmailController implements EmailControllerInterface {
    emailService: EmailServiceInterface;

    constructor(emailService: EmailServiceInterface) {
        this.emailService = emailService;
    }

    async sendEmail(req: Request, res: Response): Promise<Mail | null> {
        const {senderEmail, receiverEmail, content, title, senderId} = req.body;
        const email = await this.emailService.sendEmail(senderEmail, receiverEmail, content, title, senderId);
        return email || null;
    }
}