import {PrismaClient, Role} from "@prisma/client";
import {UserRepository} from "../../../src/domain/users/repository/implementations/UserRepository";
import {DeepMockProxy, mockDeep} from "jest-mock-extended";
import {Token} from "../../../src/token/Token";
import jwt from 'jsonwebtoken';


test('should create new user', async () => {
    const user = {
        id: 1,
        name: 'Franciscodfghj',
        email: 'ccavallaro@gmail.comdxgfhhjj',
        password: 'boquita',
        role: Role.USER,
    }
    const mockPrismaClient: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
    mockPrismaClient.user.create.mockResolvedValue(user);
    const userRepository = new UserRepository(mockPrismaClient);

    await expect(userRepository.registerUser(user.name, user.email, user.password, user.role)).resolves.toEqual(user)
})

test('login a user', async () => {
    const user = {
        id: 1,
        name: 'Francisco',
        email: 'ccavallaro@gmail.com',
        password: 'boquita',
        role: Role.USER,
    }
    const mockPrismaClient: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
    const userRepository = new UserRepository(mockPrismaClient);

    userRepository.loginUser = jest.fn().mockResolvedValue(user); //mock the login

    await expect(userRepository.loginUser(user.email, user.password)).resolves.toEqual(user);
})

test('check if token works', async () => {
    const user = {
        id: 1,
        name: 'Francisco',
        email: 'ccavallaro@gmail.com',
        password: 'boquita',
        role: Role.USER,
    }
    const mockPrismaClient: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
    const userRepository = new UserRepository(mockPrismaClient);

    userRepository.loginUser = jest.fn().mockResolvedValue(user);

    const loggedUser = await userRepository.loginUser(user.email, user.password)
    if (loggedUser) {
        const token = Token.generateToken(loggedUser)

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }
        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

        expect(decoded.id).toBe(user.id);
        expect(decoded.email).toBe(user.email);
        expect(decoded.role).toBe(user.role);
    } else {
        throw new Error('User login failed');
    }
})