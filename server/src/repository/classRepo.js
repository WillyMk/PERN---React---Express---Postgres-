import ClassRoom from "../models/classroom.js";

export const fetchAllClassRooms = async (page = 1, pageSize = 10, search, level) => {
    try {
        const offset = (page - 1) * pageSize;
        const whereClause = {
            ...(level && { level: level }), 
            ...(search && {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${search}%` } }
                ]
            })
        };
        const { count, rows} = await ClassRoom.findAndCountAll({
            offset,
            limit: pageSize,
            where: whereClause
        });
        return {
            totalElements: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
            classRooms: rows
        }
    } catch (error) {
        console.log(error)
        throw new Error("Error fetching classrooms");
    }
}

export const fetchClassRoomId = async(id) => {
    try {
        let classroom = await Dormitory.findByPk(id);
        if(!classroom) return null;
        return classroom;
    } catch(error){
        throw error;
    }
}

export const createClassRoom = async (classData) => {
    try{
        const classRoom = await ClassRoom.create(classData);
        return classRoom;
    }catch(error){
        console.log(error)
        throw new Error("Error creating classroom");
    }
}