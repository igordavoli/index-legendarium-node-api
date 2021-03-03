import { Request, Response } from 'express'
import { getRepository, Like } from 'typeorm';
import Words from '../models/Words';

export default {
  async query(req: Request, res: Response) {

    const { search } = req.query;
    const wordsRepository = getRepository(Words);
    const word = await wordsRepository.find({ vocable: Like(String(search)) })

    res.status(200).json({ search, word });
  },

  async save(req: Request, res: Response) {
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
  },

  async edit(req: Request, res: Response) {
    const {
      id,
      vocable,
      language,
      type,
      meaning,
      about,
      pages,
      see_too,
    } = req.body;
    const wordsRepository = getRepository(Words);

    const word = await wordsRepository.findOne({ id: id })

    if (!word) {
      return res.status(404).json({
        Error: 'Word not founded!'
      })
    }

    await wordsRepository.update({ id: word.id }, {
      vocable: vocable,
      language: language,
      type: type,
      meaning: meaning,
      about: about,
      pages: pages,
      see_too: see_too,
    })

    const updatedWord = await wordsRepository.findOne({ id: word.id })

    res.status(200).json(updatedWord)
  }
}