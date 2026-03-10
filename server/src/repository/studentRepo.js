import Student from "../models/student.js"

export const createStudent = async(studentData) => {
    try{
        let student = await Student.create(studentData);
        return student;
    }catch(error) {
        console.log(error)
        throw error;
    }
}

export const fetchAllStudents = async(page = 1, pageSize = 10, search, level) =>  {
    try {
        const offset = (page - 1) * pageSize;
        const whereClause = {
            ...(level && { level: level }), 
            ...(search && {
                [Op.or]: [
                    { admissionNumber: { [Op.iLike]: `%${search}%` } },
                    { name: { [Op.iLike]: `%${search}%` } }
                ]
            })
        };
        const { count, rows } = await Student.findAndCountAll({
            offset,
            limit: pageSize,
            where: whereClause,
        });
        return {
            totalElements: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
            data: rows,
        }
    }catch(error) {
        console.log(error)
        throw error;
    }
}

export const fetchStudentById = async(id) => {
    try {
        let student = await Student.findByPk(id);
        if(!student) return null;
        return student;
    } catch(error){
        throw error;
    }
}