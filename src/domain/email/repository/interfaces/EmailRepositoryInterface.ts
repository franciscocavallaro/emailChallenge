import {Mail} from "@prisma/client";

export interface EmailRepositoryInterface {
    sendEmail(senderEmail: string, receiverEmail: string, content: string, title: string): Promise<Mail | null>;

    }