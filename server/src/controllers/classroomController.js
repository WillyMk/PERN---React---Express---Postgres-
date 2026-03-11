import { validateQueryFields } from "../../utils/paramsValidator.js";
import { createClassRoom, fetchAllClasses } from "../repository/classRepo.js";

export const fetchClassRooms = async(req, res) => {
    try{
        const { page, pageSize, search, level } = validateQueryFields

        let classes = await fetchAllClasses(page, pageSize, search, level);
        res.status(200).json({success: true, message: "Classes fetched successfully", content: classes})

    }catch(error) {
        res.status(500).json({ error: "Error fetching classrooms"})
    }
}

export const saveClasses = async(req,res) => {
    try{
        const { level, name, capacity } = req.body
        let classRoom = await createClassRoom({ level, name, capacity});
        res.status(200).json({ success: true, message: "Class created successfully", content: classRoom})
    } catch(error){ 
        res.status(500).json({ error: "Error saving classes"});
    }
}