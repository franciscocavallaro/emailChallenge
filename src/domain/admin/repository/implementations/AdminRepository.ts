import {AdminRepositoryInterface} from "../interfaces/AdminRepositoryInterface";
import {PrismaClient} from "@prisma/client";
import {UserMailQuantity} from "../../../../utils/adminUtils";

export class AdminRepository implements AdminRepositoryInterface {

    prismaClient: PrismaClient

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    async getStats(): Promise<UserMailQuantity[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to start of the day
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Get the start of tomorrow

        const mailCounts = await this.prismaClient.mail.groupBy({
            by: ['senderId'],
            where: {
                AND: [
                    {
                        createdAt: {
                            gte: today,
                        },
                    },
                    {
                        createdAt: {
                            lte: tomorrow,
                        },
                    },
                ],
            },
            _count: {
                _all: true,
            },
        });

        return await Promise.all(mailCounts.map(async (mailCount) => {
            const user = await this.prismaClient.user.findUnique({
                where: {id: mailCount.senderId},
                select: {email: true},
            });

            if (!user || !user.email) {
                throw new Error(`User with id ${mailCount.senderId} not found`);
            }

            return {
                email: user.email,
                quantity: mailCount._count._all,
            };
        }));
    }
}