import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { roomRepository } from "../ropositories/roomRepository";
import { subjectRepository } from "../ropositories/subjectRepository";
import { videoRepository } from "../ropositories/videoRepository";

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    const newRoom = roomRepository.create({ name, description });
    await roomRepository.save(newRoom);

    return res.status(201).json(newRoom);
  }

  async createVideo(req: Request, res: Response) {
    //criar disciplina
    const { title, url } = req.body;
    const { idRoom } = req.params;

    const room = await roomRepository.findOneBy({ id: Number(idRoom) });

    if (!room) {
        throw new BadRequestError("Aula nao existe");
    }

    const newVideo = videoRepository.create({
      title,
      url,
      room,
    });

    await videoRepository.save(newVideo);
    return res.status(201).json(newVideo);
  }

  async roomSubject(req: Request, res: Response) {
    const { subject_id } = req.body;
    const { idRoom } = req.params;

    const room = await roomRepository.findOneBy({ id: Number(idRoom) });

    if (!room) {
        throw new BadRequestError("Aula nao existe");
    }

    const subject = await subjectRepository.findOneBy({
      id: Number(subject_id),
    });

    if (!subject) {
        throw new BadRequestError("Disciplina nao existe");
    }

    const roomUpdate = {
      ...room,
      subjects: [subject],
    };

    await roomRepository.save(roomUpdate);

    return res.status(204).send();
  }

  async list(req: Request, res: Response) {
    const rooms = await roomRepository.find({
      relations: {
        subjects: true,
        videos: true,
      },
    });

    return res.json(rooms);
  }
}
