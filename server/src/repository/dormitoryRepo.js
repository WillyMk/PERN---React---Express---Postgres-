import Dormitory from "../models/dormitory.js";

export const fetchAllDormitories = async (page = 1, pageSize = 10, search) => {
    try {
        const offset = (page - 1) * pageSize;
        const whereClause = {
            ...(search && {
                [Op.or] : [{ name: { [Op.iLike] : `%${search}%`}}]
            })
        }
        const { count, rows } = await Dormitory.findAndCountAll({
            offset,
             limit: pageSize,
            where: whereClause,
        })
        return {
            totalElements: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
            data: rows
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}  

export const fetchDormitoryById = async(id) => {
    try {
        let dorm = await Dormitory.findByPk(id);
        if(!dorm) return null;
        return dorm;
    } catch(error){
        throw error;
    }
}

export const createDormitory = async(dormData) => {
    try{
        const dormitory = await Dormitory.create(dormData);
        return dormitory;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const updateDormitory = async(id, dormitoryData) => {
    try{
        const dorm = await Dormitory.findByPk(id);
        if(!dorm){
            return null;
        }
        await dorm.update(dormitoryData);
        return dorm;
    }catch(error){
        console.log(error);
    }
}

export const deleteDormitory = async(id) => {
    try{
        let dorm = await Dormitory.findByPk(id);
        if(!dorm){
            return null;
        }
        await dorm.destroy();
        return "Dormitory deleted successfully";
    }catch(error){
        console.log(error);
        throw new Error("Error deleting dormitory");    
    }
}
