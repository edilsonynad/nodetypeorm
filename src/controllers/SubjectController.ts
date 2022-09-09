import { Request, Response } from "express";
import { subjectRepository } from "../ropositories/subjectRepository";
import { BadRequestError } from "../helpers/api-errors";

export class SubjectController{

    async create(req: Request, res: Response){
        //criar disciplina 
        const {name} = req.body
        
        if(!name){
            throw new BadRequestError("Nome e obrigatorio!!");
        }

          
        const newSubject = subjectRepository.create({name})
        await subjectRepository.save(newSubject)
        res.status(200).json({newSubject})

    }
}