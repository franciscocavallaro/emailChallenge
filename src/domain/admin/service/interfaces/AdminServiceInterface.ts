import { Request, Response} from "express";
import {UserMailQuantity} from "../../../../utils/adminUtils";
import {AdminRepositoryInterface} from "../../repository/interfaces/AdminRepositoryInterface";

export interface AdminServiceInterface {

    adminRepository: AdminRepositoryInterface;

    getStats(req: Request, res: Response): Promise<UserMailQuantity[]>;
}