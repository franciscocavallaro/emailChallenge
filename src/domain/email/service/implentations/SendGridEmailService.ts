import {EmailServiceInterface} from "../interfaces/EmailServiceInterface";
import {EmailRepositoryInterface} from "../../repository/interfaces/EmailRepositoryInterface";
import {Mail} from "@prisma/client";
import sgMail from '@sendgrid/mail'

export class SendGridEmailService implements EmailServiceInterface {

    emailRepository: EmailRepositoryInterface

    constructor(emailRepository: EmailRepositoryInterface) {
        this.emailRepository = emailRepository
        sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
    }

    async sendEmail(senderEmail: string, receiverEmail: string, content: string, title: string, senderId: number): Promise<Mail | null> {
        const email = {
            to: receiverEmail,
            from: senderEmail,
            subject: title,
            text: content
        }
        try {
            // await sgMail.send(email)
            return await this.emailRepository.sendEmail(senderEmail, receiverEmail, content, title, senderId)
        } catch (error) {
            return null
        }
    }
}