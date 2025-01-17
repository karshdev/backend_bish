
import { sendEmail, userAdded } from "../common/services/email.service";
import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";

export const createUser = async (data: IUser) => {
    const { address, email } = data;

    const userExist = await UserSchema.findOne({ address, email });
    
    if (userExist) {
        return {
            message: `This person, ${userExist.first_name} ${userExist.last_name}, has already ordered a bish code.`,
            userExist
        };
    }

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Welcome to BISH!!",
        html: userAdded( data),
      };
      await sendEmail(mailOptions);

    const result = await UserSchema.create({ ...data });
    return result;
};

export const getAllUser = async () => {
    const result = await UserSchema.find({}).lean();
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




