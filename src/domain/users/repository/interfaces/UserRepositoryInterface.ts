import {Role, User} from "@prisma/client";

export interface UserRepositoryInterface {

    registerUser(name: string, email: string, password: string, role: Role) : Promise<User | null>
    loginUser(email: string, password: string) : Promise<User | null>
}