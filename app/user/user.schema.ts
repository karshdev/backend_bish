
import mongoose from "mongoose";
import { type IUser } from "./user.dto";
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;



const UserSchema = new Schema<IUser>({
        first_name: { type: String, required: true },
        last_name:{ type: String, required: true },
        email:{ type: String, required: true },
        mobile: { type: String, required: true },
        address :{type:String ,required:true},
        postalCode: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
}, { timestamps: true });

export default mongoose.model<IUser>("user", UserSchema);