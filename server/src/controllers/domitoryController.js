import { createDormitory, fetchAllDormitories } from "../repository/dormitoryRepo.js";


export const fetchDomitories = async(req, res) => {
    try{ 
        let page = parseInt(req.query?.page) || 1;
        let pageSize = parseInt(req.query?.pageSize) || 10;
        let search = req.query?.search || null;
        let dorms = await fetchAllDormitories(page, pageSize, search);
        res.status(200).res.json({ success: true, content: dorms, message: "Dormitorues fetched successfully" });
    }catch(error) {
        consolele.log(error);
    }
}

export const saveDormitory = async(req, res) => {
    try{
        const { name, capacity,  } = req.body;
        let dormitory = await createDormitory({ name, capacity });
        res.status(201).json({ success: true, message: "Dormitory created successfully", data: dormitory });

    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: "Error saving dorms" });
    }
}