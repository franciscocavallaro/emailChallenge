import {EmailControllerInterface} from "../interfaces/EmailControllerInterface";
import {EmailServiceInterface} from "../../service/interfaces/EmailServiceInterface";
import {Request, Response} from "express";
import {Mail} from "@prisma/client";
import {UserRequest} from "../../../../utils/UserUtils";


export class EmailController implements EmailControllerInterface {
    emailService: EmailServiceInterface;

    constructor(emailService: EmailServiceInterface) {
        this.emailService = emailService;
    }

    async sendEmail(req: Request, res: Response): Promise<Mail | null> {
        const {receiverEmail, content, title} = req.body;
        const senderEmail = (req as any as UserRequest).user.email;
        const senderId = (req as any as UserRequest).user.id;

        const email = await this.emailService.sendEmail(senderEmail, receiverEmail, content, title, senderId);
        return email || null;
    }
}