import {PrismaClient, Role} from "@prisma/client";
import {DeepMockProxy, mockDeep} from "jest-mock-extended";
import {UserRepository} from "../../../src/domain/users/repository/implementations/UserRepository";
import {EmailRepository} from "../../../src/domain/email/repository/implementations/EmailRepository";


test("should send an email", async () => {

    const user = {
        id: 1,
        name: 'Francisco',
        email: 'ccavallaro@gmail.com',
        password: 'boquita',
        role: Role.USER,
    }

    const email = {
        id: 1,
        title: 'Test',
        content: 'Testing email',
        senderEmail: user.email,
        senderId: 1,
        receiverEmail: 'b@b',
        createdAt: new Date(),
    }

    const mockPrismaClient: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();

    mockPrismaClient.user.create.mockResolvedValue(user);
    mockPrismaClient.mail.create.mockResolvedValue(email);
    mockPrismaClient.user.findUnique.mockResolvedValue(user);

    const userRepository = new UserRepository(mockPrismaClient);
    const emailRepository = new EmailRepository(mockPrismaClient);

    await expect(userRepository.registerUser(user.name, user.email, user.password, user.role)).resolves.toEqual(user)
    await expect(emailRepository.sendEmail(email.senderEmail, email.receiverEmail, email.content, email.title)).resolves.toEqual(email)
})