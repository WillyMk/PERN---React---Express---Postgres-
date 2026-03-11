import AcademicTerm from "../models/academicterm.js";

export const fetchAcademicTerms = async (page = 1, pageSize = 10, search) => {
    try{
        const offset = (page - 1) * pageSize;
        const whereClause = {
            ...(search && {
                [Op.or] : [{ name: { [Op.iLike]: `%${search}%` } }]
            })
        }
        const { count, rows } = await AcademicTerm.findAndCountAll({
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

export const createAcademicTerm = async (termData) => {
    try{
        const term = await AcademicTerm.create(termData);
        return term;
    }catch(error) {
        console.log(error);
        throw error;
    }
}

export const fetchAcademicTermById = async(id) => {
    try {
        let term = await AcademicTerm.findByPk(id);
        if(!term) return null;
        return term;
    } catch(error){
        throw error;
    }
}

