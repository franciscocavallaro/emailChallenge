import {EmailRepositoryInterface} from "../interfaces/EmailRepositoryInterface";
import {Mail, PrismaClient} from "@prisma/client";

export class EmailRepository implements EmailRepositoryInterface {

    prismaClient: PrismaClient

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    async sendEmail(senderEmail: string, receiverEmail: string, content: string, title: string): Promise<Mail | null> {
        const senderUser = await this.prismaClient.user.findUnique({
            where: {
                email: senderEmail,
            },
        });

        if (!senderUser) {
            throw new Error('Sender not found');
        }

        const mail = await this.prismaClient.mail.create({
            data: {
                sender: {
                    connect: {
                        id: senderUser.id,
                    },
                },
                content: content,
                title: title,
                senderEmail: senderEmail,
                receiverEmail: receiverEmail,
            }
        });
        return mail ? mail : null
    }

    async getEmailCountToday(senderId: number): Promise<number> {
        return this.prismaClient.mail.count({
            where: {
                senderId: senderId,
                createdAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    lte: new Date(new Date().setHours(23, 59, 59, 999)),
                },
            },
        });
    }

}