
import addressSchema from "../address/address.schema";
import { sendEmail, userAdded } from "../common/services/email.service";
import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";

export const createUser = async (data: IUser) => {
    const { address, email , postalCode } = data;

    const existPostCode=await addressSchema.findOne({_id:postalCode})

    if(!existPostCode){
        throw new Error(`Address does not exist.`);
    }
    const userExist = await UserSchema.findOne({ address, email });
    
    if (userExist) {
        throw new Error(`This person, ${userExist.first_name} ${userExist.last_name}, has already ordered a bish code.`);
       
    }

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        subject: "Welcome to BISH!!",
        html: userAdded( data),
      };
      await sendEmail(mailOptions);

    const result = await UserSchema.create({ ...data });
    return result;
};

export const getAllUser = async () => {
    const result = await UserSchema.find({}).populate("postalCode").lean();
    return result;
};

// export const updateUser = async (id: string, data: IUser) => {
//     const result = await UserSchema.findOneAndUpdate({ _id: id }, data, {
//         new: true,
//     });
//     return result;
// };

// export const editUser = async (id: string, data: Partial<IUser>) => {
//     const result = await UserSchema.findOneAndUpdate({ _id: id }, data);
//     return result;
// };

// export const deleteUser = async (id: string) => {
//     const result = await UserSchema.deleteOne({ _id: id });
//     return result;
// };

// export const getUserById = async (id: string) => {
//     const result = await UserSchema.findById(id).lean();
//     return result;
// };




