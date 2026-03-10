import User from "../models/user.js";

export const createuser = async(userData) => {
    try{ 
        const user = await User.create(userData);
        return user;
    } catch(error){
        console.log(error)
    }
}

export const getUserByEmail = async(email) => {
    try{
        const user = await User.findOne({ where: { email } });
        return user;
    } catch(error) {
        console.log(error)
    }
}

export const getUserById = async(id) => {
    try{
        const user = await User.findByPk(id);
        if(!user){
            return null;
        }
        return user;
    }catch(error){
        console.log(error)
    }
}