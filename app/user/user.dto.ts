
import { Types } from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";

export interface IUser extends BaseSchema {
        first_name:string,
        last_name:string,
        email:string,
        mobile: string,
        address :string,
        bishCode :string,
        postalCode: Types.ObjectId
}
