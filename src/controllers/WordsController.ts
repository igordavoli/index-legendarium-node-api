import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { WordRepository } from '../repositories/WordRepository';
import { UserRepository } from '../repositories/UserRepository';
// import EditHistoricalController from './EditHistoricalController';
// import EditHistoricalMetadataController from './EditHistoricalMetadataController';

import saveHistorical from './EditHistoricalController';


export class WordsController {

  /*
    |>QUERY WORD
  */

  async query(req: Request, res: Response) {
    const { search } = req.query;

    if (search === '' || search === null) {
      return res.status(400).json({ message: 'Empty search nothing was found.' })
    }

    const wordRepository = getCustomRepository(WordRepository);
    const word = await wordRepository.find({ vocable: Like(String(search)) })

    if (word.length === 0) {
      return res.status(400).json({ message: 'Word not found!' })
    }

    res.status(200).json(word);
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
      return res.status(400).json({ message: 'Word already exists!' })
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
    const wordRepository = getCustomRepository(WordRepository);
    const userRepository = getCustomRepository(UserRepository);

    const {
      user_id,
      id,
      vocable,
      language,
      type,
      meaning,
      about,
      pages,
      see_too,
    } = req.body;

    const word = await wordRepository.findOne(id);
    if (!word) {
      return res.status(400).json({ message: 'Word not exists!' })
    }

    const user = await userRepository.findOne({ id: user_id });

    if (!user) {
      return res.status(400).json({ message: 'User not exists!' })
    }

    await saveHistorical(
      user_id,
      word.id,
      word.vocable,
      word.language,
      word.type,
      word.meaning,
      word.about,
      word.pages,
      word.see_too
    );

    await wordRepository.update({ id: word.id }, {
      vocable: vocable,
      language: language,
      type: type,
      meaning: meaning,
      about: about,
      pages: pages,
      see_too: see_too,
    })

    const updatedWord = await wordRepository.findOne({ id: word.id })

    res.status(201).json(updatedWord)
  }
}