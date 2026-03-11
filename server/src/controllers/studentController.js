import { validateQueryFields } from "../../utils/paramsValidator.js";
import { fetchClassRoomId } from "../repository/classRepo.js";
import { createStudent, fetchAllStudents } from "../repository/studentRepo.js";
import { getUserById } from "../repository/user.js";

export const fetchStudents = async(req, res) => {
    try{ 
        const { page, pageSize, search, level } = validateQueryFields(req)
        let students = await fetchAllStudents(page, pageSize, search, level);
        res.status(200).json({ success: true, content: students, message: "Students fetched successfully" });
    }catch(error) {
        res.status(500).json({ success: false, error: error });
    }
}

export const saveStudents = async(req, res) => {
    try{
        const { graduates, isBoarding, admissionNumber, userId, classroomId, dormitoryId } = req.body;
        let user = await getUserById(userId);
        if(!user){
            return res.status(404).json({ success: false, message: "User is required" });
        } 
        let classroom = await fetchClassRoomId(classroomId);
        if(!classroom){
            return res.status(404).json({ success: false, message: "Classroom is required" });
        } 
        let student = await createStudent({ graduates, isBoarding, admissionNumber, userId, dormitoryId, classroomId });
        res.status(201).json({ success: true, message: "Student created successfully", data: student });

    }catch(error){
        res.status(500).json({ success: false, error: error });
    }
}