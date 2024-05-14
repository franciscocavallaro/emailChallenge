import {AdminControllerInterface} from "../interfaces/AdminControllerInterface";
import {Request, Response} from "express";
import {Token} from "../../../../token/Token";
import {AdminService} from "../../service/implementations/AdminService";

export class AdminController implements AdminControllerInterface {

    adminService: AdminService;

    constructor(adminService: AdminService) {
        this.adminService = adminService;
    }

    async getStats(req: Request, res: Response): Promise<void> {
        Token.verifyToken()(req, res, async () => {
            const role = (req as any).user.role;

            if (role !== 'ADMIN') {
                res.status(403).json({message: 'Forbidden'});
                return;
            } else {
                const stats = await this.adminService.getStats(req, res);
                res.status(200).json(stats);
            }
        });
    }

}