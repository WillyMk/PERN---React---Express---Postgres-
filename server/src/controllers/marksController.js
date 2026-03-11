import { validateQueryFields } from "../../utils/paramsValidator.js";
import { fetchAcademicTermById } from "../repository/academicTermRepo.js";
import { createMarks, fetchAllMarks } from "../repository/marksRepo.js";
import { fetchStudentById } from "../repository/studentRepo.js";
import { fetchSubjectById } from "../repository/subjectRepo.js";

export const fetchStudentMarks = async (req, res) => {
    try {
        const { page, pageSize, search } = validateQueryFields(req)

        const marks = await fetchAllMarks(page, pageSize, search);
        res.status(200).json({ success: true, data: marks, message: "Marks fetched successfully" })
    } catch (error) {
       res.status(500).json({ success: false, error: error });
    }
}

export const saveMarks = async (req, res) => {
    try {
        const { examName, score, studentId, subjectId, termId } = req.body;
        let term = await fetchAcademicTermById(termId);
        if (!term) return res.status(400).json({ message: "Term data is required" })
        let subject = await fetchSubjectById(subjectId);
        if (!subject) return res.status(400).json({ message: "Subject data is required" })
        let student = await fetchStudentById(studentId);
        if (!student) return res.status(400).json({ message: "Student data is required" })
        let marks = await createMarks({ examName, score, subjectId, termId });
        res.status(201).json({ success: true, data: marks, message: "Marks saved successfully" })

    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}