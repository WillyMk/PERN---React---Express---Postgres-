import Teacher from "../models/teacher.js";

export const fetchAllTeachers = async (page = 1, pageSize = 10, search) => {
    try {
        const offset = (page - 1) * pageSize;
        const whereClause = search
            ? {
                [Op.or]: [
                    { employeeNumber: { [Op.iLike]: `%${search}%` } },
                    { name: { [Op.iLike]: `%${search}%` } }
                ]
            }
            : {};
        const { count, rows } = await Teacher.findAndCountAll({
            offset,
            limit: pageSize,
            where: whereClause
        });
        return {
            totalElements: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
            data: rows,
        }
    } catch (error) {
        throw error;
    }
}

export const createTeacher = async (teacherData) => {
    try{
        const teacher = await Teacher.create(teacherData);
        return teacher;
    }catch(error) {
        throw error;
    }
}