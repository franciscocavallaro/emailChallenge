import {EmailServiceInterface} from "../interfaces/EmailServiceInterface";
import {EmailRepositoryInterface} from "../../repository/interfaces/EmailRepositoryInterface";
import {Mail} from "@prisma/client";

export class EmailService implements EmailServiceInterface {

    emailRepository: EmailRepositoryInterface;
    emailServices: EmailServiceInterface[];
    maxLimit: number;

    constructor(emailRepository: EmailRepositoryInterface, emailServices: EmailServiceInterface[], maxLimit: number) {
        this.emailRepository = emailRepository;
        this.emailServices = emailServices;
        this.maxLimit = maxLimit;
    }

    async sendEmail(senderEmail: string, receiverEmail: string, content: string, title: string, senderId: number): Promise<Mail | null> {
        const emailCountToday = await this.emailRepository.getEmailCountToday(senderId);

        if (emailCountToday >= this.maxLimit) {
            throw new Error(`You have reached the limit of ${this.maxLimit} emails per day`);
        }

        const receiverEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!receiverEmailRegex.test(receiverEmail)) {
            throw new Error("Invalid email address");
        }

        if (!title) {
            throw new Error("Title is required to send an email");
        }

        for (const emailService of this.emailServices) {
            try {
                const response = await emailService.sendEmail(senderEmail, receiverEmail, content, title, senderId);
                if (response) {
                    return response;
                }
            } catch (e) {
                throw new Error("Error while sending email");
            }
        }
        return null;
    }

}