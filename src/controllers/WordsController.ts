import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { WordRepository } from '../repositories/WordRepository';
import { UserRepository } from '../repositories/UserRepository';
import saveHistorical from './EditHistoricalController';


export class WordsController {

  /*
    |>QUERY WORD
  */

  async query(req: Request, res: Response) {
    const wordRepository = getCustomRepository(WordRepository);
    const { search } = req.query;

    if (!search) {
      console.log('busca vazia')

      return res.status(400).json({ message: 'Empty search nothing was found.' })
    }

    const StringSearch = String(search).trim();

    const word = await wordRepository.find({ vocable: Like(String(StringSearch)) })

    if (word.length === 0) {
      console.log('não encontrada')
      return res.status(400).json({ message: 'Word not found!' })
    }

    res.status(200).json(word);
  }

  /*
    |>ADD WORD
  */

  async create(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const wordRepository = getCustomRepository(WordRepository);

    const {
      user_id,
      vocable,
      language,
      type,
      meaning,
      about,
      pages,
      see_too
    } = req.body;

    if (!vocable) {
      return res.status(400).json({ message: 'Vocable is a required field!' })
    }

    const stringVocable = String(vocable).trim();
    const user = userRepository.findOne({ id: user_id });
    const hasWord = await wordRepository.findOne({ vocable: Like(String(stringVocable)) });


    if (!user) {
      return res.status(200).json({ message: 'User not exists!' });
    }

    if (hasWord) {
      return res.status(200).json({ message: 'Word already exists!' });
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

  async find(req: Request, res: Response) {
    const { id } = req.params;

    console.log(id)

    const wordRepository = getCustomRepository(WordRepository);

    const word = await wordRepository.findOne({ id: Number(id) });

    res.status(200).json(word);

  }



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
      return res.status(200).json({ message: 'Word not exists!' });
    }

    const user = await userRepository.findOne({ id: user_id });

    if (!user) {
      return res.status(200).json({ message: 'User not exists!' });
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
    });

    const updatedWord = await wordRepository.findOne({ id: word.id });

    res.status(201).json(updatedWord);
  }
}