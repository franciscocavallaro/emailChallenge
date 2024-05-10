import { beforeEach } from "node:test"
import { MockContext, Context, createMockContext } from "../../../src/context"
import {PrismaClient, Role} from "@prisma/client";
import {UserRepository} from "../../../src/domain/users/repository/implementations/UserRepository";
import {DeepMockProxy, mockDeep} from "jest-mock-extended";
import {AdminRepository} from "../../../src/domain/admin/repository/implementations/AdminRepository";


let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
})

test('should create new user', async () => {
    const user = {
        id: 1,
        name: 'Francisco',
        email: 'ccavallaro@gmail.com',
        password: 'boquita',
        role: Role.ADMIN,
    }
    const mockPrismaClient: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
    mockPrismaClient.user.create.mockResolvedValue(user);
    const userRepository = new UserRepository(mockPrismaClient);

    await expect(userRepository.registerUser(user.name, user.email, user.password, user.role)).resolves.toEqual(user)
})
