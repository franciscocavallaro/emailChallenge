import {UserRepositoryInterface} from "../interfaces/UserRepositoryInterface";
import {PrismaClient, Role, User} from "@prisma/client";

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

    async registerUser(name: string, email: string, password: string, role: Role): Promise<User | null> {
        try {
            return await this.prismaClient.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password,
                    role: role
                }
            });
        } catch (error) {
            console.error("Error creating user: ", error);
            return null;
        }
    }

}