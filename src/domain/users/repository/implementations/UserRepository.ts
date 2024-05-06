import {UserRepositoryInterface} from "../interfaces/UserRepositoryInterface";
import {PrismaClient, User} from "@prisma/client";

export class UserRepository implements UserRepositoryInterface {

    prismaClient: PrismaClient

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.prismaClient.user.findFirst({
                where: {email: email}
            }
        )
        return user ? user : null
    }

    async loginUser(email: string, password: string): Promise<User | null> {
        const user = await this.prismaClient.user.findFirst({
                where: {email: email, password: password}
            }
        )
        return user ? user : null
    }

    registerUser(name: string, email: string, password: string): Promise<User | null> {
        return this.prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        })
    }

}