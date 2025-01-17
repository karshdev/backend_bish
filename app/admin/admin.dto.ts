
import { type BaseSchema } from "../common/dto/base.dto";

export interface IAdmin extends BaseSchema {
        email: string;
        active?: boolean
        role:string;
        password: string
}
