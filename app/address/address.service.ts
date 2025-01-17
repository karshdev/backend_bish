
import { type IAddress } from "./address.dto";
import AddressSchema from "./address.schema";

export const createAddress = async (data: IAddress) => {
    const result = await AddressSchema.create({ ...data});
    return result;
};

export const getAddresses = async () => {
    const result = await AddressSchema.find({}).lean();
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


// export const getUserByEmail = async (email: string) => {
//     const result = await UserSchema.findOne({ email }).lean();
//     return result;
// }

