import {EmailServiceInterface} from "../interfaces/EmailServiceInterface";
import {Mail, PrismaClient, User} from "@prisma/client";
import {EmailRepositoryInterface} from "../../repository/interfaces/EmailRepositoryInterface";
import { NodeMailgun } from "ts-mailgun";

export class MailGunEmailService implements EmailServiceInterface {

    mailGun: NodeMailgun
    emailRepository: EmailRepositoryInterface

    constructor(emailRepository: EmailRepositoryInterface) {
        this.mailGun = new NodeMailgun()
        this.mailGun.apiKey = process.env.MAILGUN_API_KEY as string
        this.emailRepository = emailRepository
    }

    async sendEmail(senderEmail: string, receiverEmail: string, content: string, title: string): Promise<Mail | null> {
        this.mailGun.domain = process.env.MAILGUN_DOMAIN as string
        this.mailGun.fromEmail = senderEmail
        this.mailGun.fromTitle = title
        this.mailGun.init()
        try {
            // await this.mailGun.send(receiverEmail, title, content)
            return await this.emailRepository.sendEmail(senderEmail, receiverEmail, content, title)
        }
        catch (error) {
            return null
        }
    }

}