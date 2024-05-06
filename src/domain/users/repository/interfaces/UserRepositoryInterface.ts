import {User} from "@prisma/client";

export interface UserRepositoryInterface {

    registerUser(name: string, email: string, password: string) : Promise<User | null>
    loginUser(email: string, password: string) : Promise<User | null>
    getUserByEmail(email: string) : Promise<User | null>
}