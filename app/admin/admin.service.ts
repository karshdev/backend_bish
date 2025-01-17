
import { IAdmin } from "./admin.dto";
import adminSchema from "./admin.schema";

export const createUser = async (data: IAdmin) => {
    const result = await adminSchema.create({ ...data, active: true });
    return result;
};

export const updateUser = async (id: string, data: IAdmin) => {
    const result = await adminSchema.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

export const editUser = async (id: string, data: Partial<IAdmin>) => {
    const result = await adminSchema.findOneAndUpdate({ _id: id }, data);
    return result;
};

export const deleteUser = async (id: string) => {
    const result = await adminSchema.deleteOne({ _id: id });
    return result;
};

export const getUserById = async (id: string) => {
    const result = await adminSchema.findById(id).lean();
    return result;
};

export const getAllUser = async () => {
    const result = await adminSchema.find({}).lean();
    return result;
};
export const getUserByEmail = async (email: string) => {
    const result = await adminSchema.findOne({ email }).lean();
    return result;
}

