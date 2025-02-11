
import mongoose from "mongoose";
import addressSchema from "../address/address.schema";
import { sendEmail, userAdded } from "../common/services/email.service";
import { generateBishCode, sendSequentialSMS } from "../common/services/sms.service";
import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";

export const createUser = async (data: IUser) => {
    const { address, email , postalCode } = data;
    const existPostCode = await addressSchema.findOne({_id:postalCode})

    if(!existPostCode){
        throw new Error(`Address does not exist.`);
    }
    const userExist = await UserSchema.findOne({ address, email })
    
    if (userExist) {
        throw new Error(`This person, ${userExist.first_name} ${userExist.last_name}, has already ordered a bish code.`);
    }

   const bishCode = generateBishCode();
   const send=await sendSequentialSMS(data.mobile,bishCode)
  
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        subject: "Welcome to BISH!!",
        html: userAdded(data,existPostCode.postalCode),
      };
      await sendEmail(mailOptions);

    const result = await UserSchema.create({ ...data , bishCode });
    return result;
};

export const getAllUser = async () => {
    const result = await UserSchema.find({}).populate("postalCode").lean();
    return result;
};
export const getUserData = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        const aggregateResult = await mongoose.model<IUser>("user").aggregate([
            {
                $facet: {
                    newUsers: [
                        {
                            $match: {
                                createdAt: {
                                    $gte: today
                                }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    totalUsers: [
                        {
                            $match: {
                                // Add any active user criteria here if needed
                                // For example, if you want to count users who have logged in recently:
                                // lastLoginDate: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    recentUsers: [
                        {
                            $match: {
                                createdAt: {
                                    $gte: today
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: "addresses",
                                localField: "postalCode",
                                foreignField: "_id",
                                as: "addressDetails"
                            }
                        },
                        {
                            $project: {
                                first_name: 1,
                                last_name: 1,
                                email: 1,
                                mobile: 1,
                                address: 1,
                                bishCode: 1,
                                createdAt: 1,
                                "addressDetails.postalCode": 1
                            }
                        },
                        {
                            $sort: { createdAt: -1 }
                        },
                        {
                            $limit: 10
                        }
                    ]
                }
            }
        ]);

        const result = {
            newUsersToday: aggregateResult[0].newUsers[0]?.count || 0,
            totalActiveUsers: aggregateResult[0].totalUsers[0]?.count || 0,
            recentUsers: aggregateResult[0].recentUsers || []
        };

        return result;
    } catch (error:any) {
        throw new Error(`Error fetching user dashboard data: ${error.message}`);
    }
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




