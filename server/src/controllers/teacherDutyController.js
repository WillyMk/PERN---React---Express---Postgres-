import { validateQueryFields } from "../utils/paramsValidator.js";
import { createTeacherDuty, fetchAllTeacherDuties } from "../repository/teacherDutyRepo.js";

export const fetchTeacherDuties = async(req, res) => {
    try{ 
        const { page, pageSize, search } = validateQueryFields(req)
        let teacherDuties = await fetchAllTeacherDuties(page, pageSize, search);
        res.status(200).res.json({ success: true, content: teacherDuties, message: "Teacher duties fetched successfully" });
    }catch(error){
        res.status(500).json({ success: false, error: error });
    }
}

export const saveTeacherDuty = async(req, res) => {
    try{
        const { day } = req.body;
        if(day !== "MONDAY" || day !== "TUESDAY" || day !== "WEDNESDAY" || day !== "THURSDAY" || day !== "FRIDAY" || day !== "SATURDAY" || day !== "SUNDAY"){
            return res.status(400).json({ success: false, message: "Invalid day provided" });
        }
        const teacherDuty = await createTeacherDuty(req.body);
        res.status(201).json({ success: true, message: "Teacher duty created successfully", data: teacherDuty });
    }
    catch(error){
        res.status(500).json({ success: false, error: error });
    }
}