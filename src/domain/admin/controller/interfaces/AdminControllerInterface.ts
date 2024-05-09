import { Request, Response } from 'express';
import {Mail} from "@prisma/client";
import {UserMailQuantity} from "../../../../utils/adminUtils";
import {AdminServiceInterface} from "../../service/interfaces/AdminServiceInterface";

export interface AdminControllerInterface {

    adminService: AdminServiceInterface;

    getStats(req: Request, res: Response): Promise<void>;
}