import {Mail} from "@prisma/client";

export interface EmailRepositoryInterface {
    sendEmail(senderEmail: string, receiverEmail: string, content: string, title: string, senderId: number): Promise<Mail | null>;

}