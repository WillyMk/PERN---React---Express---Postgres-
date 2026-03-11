import { validateQueryFields } from "../../utils/paramsValidator.js";
import { createAcademicTerm, fetchAcademicTerms } from "../repository/academicTermRepo.js";

export const fetchTerms = async(req, res) => {
    try{ 
        const { page, pageSize, search } = validateQueryFields(req)
        let terms = await fetchAcademicTerms(page, pageSize, search);
        res.status(200).res.json({ success: true, content: terms, message: "Terms fetched successfully" });
    }catch(error) {
        res.status(500).json({success: false, error: error})
    }
}

export const saveTerms = async(req, res) => {
    try{
        const { name, capacity,  } = req.body;
        let term = await createAcademicTerm({ name, capacity });
        res.status(201).json({ success: true, message: "Terms created successfully", data: term });

    }catch(error){
        res.status(500).json({ success: false, error: error });
    }
}