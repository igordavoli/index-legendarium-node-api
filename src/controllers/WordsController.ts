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

      return res.status(200).json({ message: 'Empty search nothing was found.' })
    }

    const StringSearch = String(search).trim();
    const word = await wordRepository.find({ vocable: Like(String(StringSearch)) })

    if (word.length === 0) {
      console.log('não encontrada')
      return res.status(200).json({
        message: 'Word not finded!',
        searchedWord: search

      })
    }

    res.status(200).json(word);
  }

  /*
    |>ADD WORD
  */

  async create(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const wordRepository = getCustomRepository(WordRepository);
    const { id } = req.body.decoded;

    const user_id = id;

    console.log(user_id)

    const {
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

    const hasUser = await userRepository.findOne({ id: user_id });

    if (!hasUser) {
      return res.status(200).json({ message: 'User not exists!' });
    }

    const hasWord = await wordRepository.findOne({ vocable: Like(stringVocable) });

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

    const wordRepository = getCustomRepository(WordRepository);
    const word = await wordRepository.findOne(Number(id));

    res.status(200).json(word);
  }

  async update(req: Request, res: Response) {
    const wordRepository = getCustomRepository(WordRepository);
    const userRepository = getCustomRepository(UserRepository);

    const user_id = req.body.decoded.id;
    const { word } = req.body;

    const hasWord = await wordRepository.findOneOrFail({ id: word.id });

    const user = await userRepository.findOneOrFail({ id: user_id });

    await saveHistorical(
      user.id,
      hasWord.id,
      hasWord.vocable,
      hasWord.language,
      hasWord.type,
      hasWord.meaning,
      hasWord.about,
      hasWord.pages,
      hasWord.see_too
    );

    await wordRepository.update({ id: word.id }, {
      vocable: word.vocable,
      language: word.language,
      type: word.type,
      meaning: word.meaning,
      about: word.about,
      pages: word.pages,
      see_too: word.see_too,
    });

    const updatedWord = await wordRepository.findOne({ id: word.id });

    res.status(201).json(updatedWord);
  }
}