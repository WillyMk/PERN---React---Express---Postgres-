import Marks from "../models/marks.js";

export const fetchAllMarks = async(page= 1, pageSize = 10, search) => {
    try{
        const offset = (page - 1) * pageSize;
        const whereClause = {
            ...(search && {
                [Op.or] : [{ name: { [Op.iLike] : `%${search}%`} }]
            })
        }
        const { count, rows} = await Marks.findAndCountAll({
            offset,
            limit: pageSize,
            where: whereClause
        })
        return {
            totalElements: count,
            totalPages: math.ceil(count / pageSize),
            currentPage: page,
            data: rows
        }
    }catch(error){
        console.log(error);
    }
}

export const createMarks = async(marksData) => {
    try{
        const marks = await Marks.create(marksData);
        return marks;
    }catch(error){
        console.log(error);
    }
}