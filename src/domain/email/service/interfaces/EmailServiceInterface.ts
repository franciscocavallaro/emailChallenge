import {EmailRepositoryInterface} from "../../repository/interfaces/EmailRepositoryInterface";
import {Mail, User} from "@prisma/client";

export interface EmailServiceInterface {

    sendEmail(senderEmail: string, receiverEmail: string, content: string, title: string, senderId: number): Promise<Mail | null>;
}