import {PrismaClient} from "@prisma/client";
import {Router} from "express";
import {EmailRepository} from "./repository/implementations/EmailRepository";
import {EmailController} from "./controller/implementations/EmailController";
import {MailGunEmailService} from "./service/implentations/MailGunEmailService";
import {SendGridEmailService} from "./service/implentations/SendGridEmailService";
import {NodeMailgun} from "ts-mailgun";

const emailRouter = Router();

const prismaClient = new PrismaClient();
const emailRepository = new EmailRepository(prismaClient);
const emailService = new SendGridEmailService(emailRepository)
const emailController = new EmailController(emailService);

emailRouter.post("/sendEmail", async (req, res) => {
    try {
        const email = await emailController.sendEmail(req, res);
        if (email) {
            res.status(200).json(email);
        } else {
            res.status(400).json({error: 'Error sending email'});
        }
    } catch (error) {
        res.status(500).json({error});
    }
});

export default emailRouter;