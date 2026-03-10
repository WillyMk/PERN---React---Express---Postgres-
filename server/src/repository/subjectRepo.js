import Subject from "../models/subject.js";

export const fetchAllSubjects = async(page = 1, pageSize = 10, search) => {
     try{
        const offset = (page - 1) * pageSize;
        const whereClause = {
            ...(search && {
                [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }]
            })
        }

        const { count, rows} = Subject.findAndCountAll({
            offset,
            where: whereClause
        })
        return {
            totalElements: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
            data: rows
        }
     }catch(error){
        console.log(error);
        throw error;
     }
}

export const fetchSubjectById = async(id) => {
    try {
        let subject = await Subject.findByPk(id);
        if(!subject) return null;
        return subject;
    } catch(error){
        throw error;
    }
}

export const  createSubject = async(subjectData) => {
    try{
        const subject = await Subject.create(subjectData);
        return subject;
    }catch(error){
        console.log(error);
        throw new Error("Error creating subject");
    }
}
