import { validateQueryFields } from "../../utils/paramsValidator.js";
import { createTeacher, fetchAllTeachers } from "../repository/teacherRepo.js";
import { getUserById } from "../repository/user.js";

export const fetchTeachers = async(req, res) => {
    try{ 
        const { page, pageSize, search } = validateQueryFields(req)
        let teachers = await fetchAllTeachers(page, pageSize, search);
        res.status(200).res.json({ success: true, content: teachers, message: "Teachers fetched successfully" });
    }catch(error) {
        res.status(500).json({ success: false, message: "Error fetching teachers" });
    }
}

export const saveTeacher = async(req, res) => {
    try{
        const { employeeNumber, userId } = req.body;
        let user = await getUserById(userId);
        if(!user) {
            res.status(404).json({ success: false, message: "An error occured while creating teacher, check id" });
        }
        let teacher = await createTeacher({ employeeNumber, userId });
        res.status(201).json({ success: true, message: "Teacher created successfully", data: teacher });
    }catch(error) {
        res.status(500).json({ success: false, message: "Error saving teachers"});
    }
}