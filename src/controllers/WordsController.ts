import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { WordRepository } from '../repositories/WordRepository';
import { UserRepository } from '../repositories/UserRepository';
import saveHistorical from './EditHistoricalController';
import { AppError } from '../errors/AppError';
import { WordsPagesController } from './WordsPagesController';


export class WordsController {

  async query(req: Request, res: Response) {
    const wordRepository = getCustomRepository(WordRepository);
    const { search } = req.query;

    if (!search) {
      throw new AppError('Empty search nothing was returned.', 400);
    }

    const StringSearch = String(search).trim();
    const words = await wordRepository.find({ vocable: Like(String(StringSearch)) });

    if (words.length === 0) {
      throw new AppError('Word not finded!', 404);
    }

    res.status(200).json(words);
  }

  async create(req: Request, res: Response) {
    try {
      const userRepository = getCustomRepository(UserRepository);
      const wordRepository = getCustomRepository(WordRepository);
      const user_id = req.body.decoded.id;

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
        throw new AppError('Vocable is a required field!', 400);
      }

      const stringVocable = String(vocable).trim();

      const hasUser = await userRepository.findOneOrFail({ id: user_id });

      if (!hasUser) {
        throw new AppError('User not exists!', 422);
      }

      const hasWord = await wordRepository.findOne({ vocable: Like(stringVocable) });

      if (hasWord) {
        throw new AppError('Word already exists!', 409);
      }

      const word = wordRepository.create({
        created_by: user_id,
        vocable,
        language,
        type,
        meaning,
        about,
        see_too
      });

      await wordRepository.save(word);

      const savedWord = await wordRepository.findOneOrFail({ vocable: word.vocable })

      WordsPagesController(pages, savedWord.id)

      res.status(201).json(word);

    } catch (error) {
      throw new AppError(error);
    }
  }

  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const wordRepository = getCustomRepository(WordRepository);
      const word = await wordRepository.findOneOrFail(id);

      res.status(200).json(word);

    } catch (error) {
      throw new AppError(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { word } = req.body;
      const user_id = req.body.decoded.id;

      const wordRepository = getCustomRepository(WordRepository);
      const userRepository = getCustomRepository(UserRepository);

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
        hasWord.see_too
      );

      await wordRepository.update({ id: word.id }, {
        vocable: word.vocable,
        language: word.language,
        type: word.type,
        meaning: word.meaning,
        about: word.about,
        see_too: word.see_too,
      });

      const updatedWord = await wordRepository.findOneOrFail({ id: word.id });

      res.status(201).json(updatedWord);

    } catch (error) {
      throw new AppError(error);
    }
  }
}