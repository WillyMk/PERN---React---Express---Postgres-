import TeacherDuty from "../models/teacherDuty.js";

export const fetchAllTeacherDuties = async(page = 1, pageSize = 10, search) => {
    try{
        const offset = (page - 1) * pageSize;
        const whereClause = {
            ...(search && {
                [Op.or] : [{ name: {[Op.iLike]: `%${search}%`} }]
            })
        }
        const { count, rows} = await TeacherDuty.findAndCountAll({
            offset,
            limit: pageSize,
            where: whereClause
        })

        return {
            totalElements: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
            data: rows
        }
    }catch(error){
       throw error;
    }
}

export const createTeacherDuty = async(teacherDutyData) => {
    try{
        const duty = await TeacherDuty.create(teacherDutyData);
        return duty;
    }catch(error) {
        throw error;
    }
}