import {UserMailQuantity} from "../../../../utils/adminUtils";

export interface AdminRepositoryInterface {

    getStats(): Promise<UserMailQuantity[]>;

}