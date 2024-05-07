import {EmailRepositoryInterface} from "../interfaces/EmailRepositoryInterface";
import {Mail, PrismaClient} from "@prisma/client";

export class EmailRepository implements EmailRepositoryInterface {

    prismaClient: PrismaClient

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    async sendEmail(senderEmail: string, receiverEmail: string, content: string, title: string, senderId: number): Promise<Mail | null> {
        const mail = await this.prismaClient.mail.create({
            data: {
                content: content,
                title: title,
                senderId: senderId,
                receiverEmail: receiverEmail
            }
        });
        return mail ? mail : null
    }

}