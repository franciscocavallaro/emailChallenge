import {Router} from "express";
import {EmailRepository} from "./repository/implementations/EmailRepository";
import {EmailController} from "./controller/implementations/EmailController";
import {MailGunEmailService} from "./service/implentations/MailGunEmailService";
import {SendGridEmailService} from "./service/implentations/SendGridEmailService";
import {Token} from "../../token/Token";
import {EmailService} from "./service/implentations/EmailService";
import prisma from "../../../client";

const emailRouter = Router();

const emailRepository = new EmailRepository(prisma);
const mailGunEmailService = new MailGunEmailService(emailRepository);
const sendGridEmailService = new SendGridEmailService(emailRepository);
const emailService = new EmailService(emailRepository, [mailGunEmailService, sendGridEmailService], 2)
const emailController = new EmailController(emailService);

emailRouter.post("/sendEmail", Token.verifyToken(), async (req, res) => {
    try {
        const email = await emailController.sendEmail(req, res);
        if (email) {
            res.status(200).json(email);
        } else {
            res.status(400).json({error: 'Error sending email'});
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({error: error.message});
        }
    }
});

export default emailRouter;