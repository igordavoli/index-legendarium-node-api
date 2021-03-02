import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import Words from '../models/Words';

export default {
  async create(req: Request, res: Response) {
    const {
      vocable,
      language,
      type,
      meaning,
      about,
      pages,
      see_too
    } = req.body;

    const wordsRepository = getRepository(Words);

    const word = wordsRepository.create({
      vocable,
      language,
      type,
      meaning,
      about,
      pages,
      see_too
    }
    );

    await wordsRepository.save(word);

    res.status(201).json(word);
  }
}