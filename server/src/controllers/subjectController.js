import { createSubject, fetchAllSubjects } from "../repository/subjectRepo.js";


export const fetchSubjects = async(req, res) => {
    try{ 
        let page = parseInt(req.query?.page) || 1;
        let pageSize = parseInt(req.query?.pageSize) || 10;
        let search = req.query?.search || null;
        let subjects = await fetchAllSubjects(page, pageSize, search);
        res.status(200).res.json({ success: true, content: subjects, message: "Subjects fetched successfully" });
    }catch(error) {
       res.status(500).json({ success: false, message: "Error fetching subjects" });
    }
}

export const saveSubject = async(req, res) => {
    try{
        const { name,  } = req.body;
        let subject = await createSubject({ name });
        res.status(201).json({ success: true, message: "Subject created successfully", data: subject });

    }catch(error){
        res.status(500).json({ success: false, message: "Error saving subjects" });
    }
}