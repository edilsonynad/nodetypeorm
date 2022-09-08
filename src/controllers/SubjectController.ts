import { Request, Response } from "express";
import { subjectRepository } from "../ropositories/subjectRepository";


export class SubjectController{

    async create(req: Request, res: Response){
        //criar disciplina 
        const {name} = req.body
        
        if(!name){
            return res.status(400).json({msg: "O nome e obrigatorio"})
        }

        try{
            
            const newSubject = subjectRepository.create({name})
            await subjectRepository.save(newSubject)
            res.status(200).json({newSubject})

        }catch(error){
            console.log(error);
            return res.status(500).json({msg: 'Internal server error'})
        }
    }
}