import {Role} from "@prisma/client";
import app from "../../../src";
import request from "supertest";
import {prismaMock} from "../../../singleton";

afterEach(() => {
    app.close();
});

describe('Email E2E test', () => {

    test("should send an email", async () => {

        const user = {
            id: 1,
            name: 'Francisco',
            email: 'ccavallaro@gmail.com',
            password: 'boquita',
            role: Role.ADMIN,
        }
        prismaMock.user.create.mockResolvedValue(user);
        prismaMock.user.findFirst.mockResolvedValue(user);

        const loginResponse = await request(app)
            .post('/api/user/loginUser')
            .send({
                email : 'ccavallaro@gmail.com',
                password : 'boquita',
            });
        expect(loginResponse.statusCode).toEqual(200);

        const email = {
            id: 1,
            title: 'Test',
            content: 'Testing email',
            senderEmail: user.email,
            senderId: 1,
            receiverEmail: 'b@b',
            createdAt: new Date(),
        }

        prismaMock.mail.create.mockResolvedValue(email);
        prismaMock.user.findUnique.mockResolvedValue(user);

        const emailResponse = await request(app)
            .post('/api/email/sendEmail')
            .send({
                title: 'Test',
                content: 'Testing email',
                senderEmail: user.email,
                receiverEmail: 'b@b',
            })
            .set('Authorization', `Bearer ${loginResponse.body.token}`);
        expect(emailResponse.statusCode).toEqual(200);
    })
});