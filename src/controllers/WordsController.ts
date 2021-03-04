import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { WordRepository } from '../repositories/WordRepository';

export class WordsController {

  /*
    |>QUERY WORD
  */

  async query(req: Request, res: Response) {
    const { search } = req.query;
    const wordRepository = getCustomRepository(WordRepository);
    const word = await wordRepository.find({ vocable: Like(String(search)) })

    res.status(200).json({ search, word });
  }

  /*
    |>ADD WORD
  */

  async create(req: Request, res: Response) {
    const wordRepository = getCustomRepository(WordRepository);
    const {
      vocable,
      language,
      type,
      meaning,
      about,
      pages,
      see_too
    } = req.body;

    const hasWord = await wordRepository.findOne({ vocable: Like(String(vocable)) })

    if (hasWord) {
      return res.status(400).json({ Error: 'Word already exists!' })
    }

    const word = wordRepository.create({
      vocable,
      language,
      type,
      meaning,
      about,
      pages,
      see_too
    });

    await wordRepository.save(word);

    res.status(201).json(word);
  }

  /*
    |>EDIT WORD
  */

  async update(req: Request, res: Response) {
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

    const wordRepository = getCustomRepository(WordRepository);

    const word = await wordRepository.findOne({ id: id })

    await wordRepository.update({ id: word?.id }, {
      vocable: vocable,
      language: language,
      type: type,
      meaning: meaning,
      about: about,
      pages: pages,
      see_too: see_too,
    })

    const updatedWord = await wordRepository.findOne({ id: word?.id })

    res.status(201).json(updatedWord)
  }
}