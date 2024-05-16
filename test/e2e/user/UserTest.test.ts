import {Role} from "@prisma/client";
import app from "../../../src";
import request from "supertest";
import {prismaMock} from "../../../singleton";

afterEach(() => {
    app.close();
});

describe('Email E2E test', () => {

    test("should login a user", async () => {
        const user = {
            id: 1,
            name: 'Francisco',
            email: 'ccavallaro@gmail.com',
            password: 'boquita',
            role: Role.USER,
        }

        prismaMock.user.create.mockResolvedValue(user);
        prismaMock.user.findFirst.mockResolvedValue(user);

        const response = await request(app)
            .post('/api/user/login_user')
            .send({
                email: 'ccavallaro@gmail.com',
                password: 'boquita',
            });
        expect(response.statusCode).toEqual(200);
    });

    test("should deny access to get stats", async () => {
        const user = {
            id: 1,
            name: 'Francisco',
            email: 'ccavallro@gmail.com',
            password: 'boquita',
            role: Role.USER,
        }

        prismaMock.user.create.mockResolvedValue(user);
        prismaMock.user.findFirst.mockResolvedValue(user);

        const loginResponse = await request(app)
            .post('/api/user/login_user')
            .send({
                email: 'ccavallaro@gmail.com',
                password: 'boquita',
            });

        expect(loginResponse.statusCode).toEqual(200);

        const response = await request(app)
            .get('/api/admin/stats')
            .set('Authorization', `Bearer ${loginResponse.body.token}`);

        expect(response.statusCode).toEqual(403);
    });

});