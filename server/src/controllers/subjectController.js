import { validateQueryFields } from "../utils/paramsValidator.js";
import { createSubject, fetchAllSubjects } from "../repository/subjectRepo.js";


export const fetchSubjects = async(req, res) => {
    try{ 
        const { page, pageSize, search } = validateQueryFields(req)
        let subjects = await fetchAllSubjects(page, pageSize, search);
        res.status(200).res.json({ success: true, content: subjects, message: "Subjects fetched successfully" });
    }catch(error) {
       res.status(500).json({ success: false, error: error });
    }
}

export const saveSubject = async(req, res) => {
    try{
        const { name,  } = req.body;
        let subject = await createSubject({ name });
        res.status(201).json({ success: true, message: "Subject created successfully", data: subject });

    }catch(error){
        res.status(500).json({ success: false, error: error });
    }
}