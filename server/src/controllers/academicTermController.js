import { createAcademicTerm, fetchAcademicTerms } from "../repository/academicTermRepo.js";

export const fetchTerms = async(req, res) => {
    try{ 
        let page = parseInt(req.query?.page) || 1;
        let pageSize = parseInt(req.query?.pageSize) || 10;
        let search = req.query?.search || null;
        let terms = await fetchAcademicTerms(page, pageSize, search);
        res.status(200).res.json({ success: true, content: terms, message: "Terms fetched successfully" });
    }catch(error) {
        consolele.log(error);
    }
}

export const saveTerms = async(req, res) => {
    try{
        const { name, capacity,  } = req.body;
        let term = await createAcademicTerm({ name, capacity });
        res.status(201).json({ success: true, message: "Terms created successfully", data: term });

    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: "Error saving term" });
    }
}