import {Request, Response} from 'express';
import {AdminServiceInterface} from "../interfaces/AdminServiceInterface";
import {UserMailQuantity} from "../../../../utils/adminUtils";
import {AdminRepository} from "../../repository/implementations/AdminRepository";

export class AdminService implements AdminServiceInterface {

    adminRepository: AdminRepository;

    constructor(adminRepository: AdminRepository) {
        this.adminRepository = adminRepository;
    }

    async getStats(req: Request, res: Response): Promise<UserMailQuantity[]> {
        return this.adminRepository.getStats();
    }

}