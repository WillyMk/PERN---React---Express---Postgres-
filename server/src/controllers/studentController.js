import { fetchClassRoomId } from "../repository/classRepo.js";
import { createStudent, fetchAllStudents } from "../repository/studentRepo.js";
import { getUserById } from "../repository/user.js";

export const fetchStudents = async(req, res) => {
    try{ 
        let page = parseInt(req.query?.page) || 1;
        let pageSize = parseInt(req.query?.pageSize) || 10;
        let search = req.query?.search || null;
        let level = req.query?.level || null;
        let students = await fetchAllStudents(page, pageSize, search, level);
        res.status(200).res.json({ success: true, content: students, message: "Students fetched successfully" });
    }catch(error) {
        consolele.log(error);
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
        console.log(error);
        res.status(500).json({ success: false, message: "Error saving students" });
    }
}