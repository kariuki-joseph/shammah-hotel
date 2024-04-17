import { TUser } from "./user.interface";
import { User } from "./user.model";

const storeUserToDB = async(userData: TUser) => {
    if (await User.isUserExists(userData.email)) {
        console.log("User exist for: ",userData.email)
        return;
      } else {
        const result = await User.create(userData)
        return result;
      }
   
}
const getSingleUserFromDB = async(email:string) => {
    const result = await User.findOne({email: email})
    return result;
}
const getAllUserFromDB = async() => {
  //This query will return unique users , if a user has more than one duplicated value it will show one value
  const result = await User.aggregate([
    {
      $group: {
        _id: '$email',
        user: { $first: '$$ROOT' },
      },
    },
    {
      $replaceRoot: { newRoot: '$user' },
    },
  ]);
  return result;
}

const checkAdminFromDB = async(email: string) => {
  const user =  User.findOne({email: email},{role: true});
  // console.log(user)
  // const isAdmin = user === 'admin';
  return user;
}

export const UserServices = {
    storeUserToDB,
    getSingleUserFromDB,
    getAllUserFromDB,
    checkAdminFromDB
}