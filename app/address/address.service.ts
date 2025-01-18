
import { type IAddress } from "./address.dto";
import addressSchema from "./address.schema";
import AddressSchema from "./address.schema";

export const createAddress = async (data: IAddress) => {
    const existingAddress = await AddressSchema.findOne({ postalCode: data.postalCode });
  
    if (existingAddress) {
      throw new Error(`Address with postalCode ${data.postalCode} already exists.`);
    }
  
    const result = await AddressSchema.create({ ...data });
    return result;
  };

export const getAddresses = async () => {
    const result = await AddressSchema.find({}).lean();
    return result;
};
export const deleteAddress = async (id: string) => {
    const existingAddress = await AddressSchema.findById(id);
  
    if (!existingAddress) {
      throw new Error(`Address  does not exist.`);
    }
    const result = await AddressSchema.deleteOne({ _id: id });
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

// export const getUserById = async (id: string) => {
//     const result = await UserSchema.findById(id).lean();
//     return result;
// };


// export const getUserByEmail = async (email: string) => {
//     const result = await UserSchema.findOne({ email }).lean();
//     return result;
// }

