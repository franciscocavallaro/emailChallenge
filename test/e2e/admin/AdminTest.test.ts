import request from 'supertest';
import app from '../../../src/index';
import {Role} from "@prisma/client";
import {prismaMock} from "../../../singleton";
import {describe} from "@jest/globals";

beforeAll(() => {
    process.env.JWT_SECRET="mySecretJWT"
    process.env.port="3000"
})


afterEach(() => {
    app.close();
});

describe('Admin E2E test', () => {

    test("should login an admin", async () => {
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
            .post('/api/user/login_user')
            .send({
                email : "ccavallaro@gmail.com",
                password : "boquita",
            });
        expect(loginResponse.statusCode).toEqual(200);

    });


    test("should get stats", async () => {
        const user = {
            id: 1,
            name: 'Francisco',
            email: 'ccavallaro@gmail.com',
            password: 'boquita',
            role: Role.ADMIN,
        }

        prismaMock.user.create.mockResolvedValue(user);
        prismaMock.user.findFirst.mockResolvedValue(user);
        prismaMock.user.findUnique.mockResolvedValue(user);

        const loginResponse = await request(app)
            .post('/api/user/login_user')
            .send({
                email : "ccavallaro@gmail.com",
                password : "boquita",
            });

        expect(loginResponse.statusCode).toEqual(200);

        const mockMailCounts = [
            {
                senderId: 1,
                _count: {
                    _all: 1
                }
            }
        ];

        prismaMock.mail.groupBy = jest.fn().mockResolvedValue(mockMailCounts);

        const statsResponse = await request(app)
            .get('/api/admin/stats')
            .set('Authorization', `Bearer ${loginResponse.body.token}`);

        expect(statsResponse.statusCode).toEqual(200);
    });
});

