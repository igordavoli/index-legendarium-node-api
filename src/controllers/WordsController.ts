import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { WordRepository } from '../repositories/WordRepository';
import { UserRepository } from '../repositories/UserRepository';
import { AppError } from '../errors/AppError';
//import { Pages } from '../models/Pages';
import { WordService } from '../services';
//import { PagesRepository } from '../repositories/PagesRepository';

export class WordsController {

  async query(req: Request, res: Response) {
    try {
      const wordService = new WordService;
      const { search } = req.query;

      if (!search) {
        throw new AppError('Empty search nothing was returned.', 204);
      }

      const words = await wordService.search(
        String(search).trim()
      );

      if (words.length === 0) {
        throw new AppError('Word not found!', 204);
      }

      res.status(200).json(words);

    } catch (error) {
      throw new AppError(error);
    }
  }

  async create(req: Request, res: Response) {

    try {
      const wordService = new WordService;
      const userId = req.body.decoded.id;
      const { word } = req.body;
      const savedWord = await wordService.create(word, userId);

      res.status(201).json({ savedWord });

    } catch (error) {
      throw new AppError(error);
    }
  }

  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const wordService = new WordService;

      const word = await wordService.findById(id);

      res.status(200).json(word);

    } catch (error) {
      throw new AppError(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { word } = req.body;
      const userId = req.body.decoded.id;

      const wordRepository = getCustomRepository(WordRepository);
      const userRepository = getCustomRepository(UserRepository);
      const hasWord = await wordRepository.findOneOrFail({ id: word.id });
      const user = await userRepository.findOneOrFail({ id: userId });


      // await saveHistorical(
      //   user.id,
      //   hasWord.id,
      //   hasWord.vocable,
      //   hasWord.language,
      //   hasWord.type,
      //   hasWord.meaning,
      //   hasWord.about,
      //   hasWord.seeToo
      // );

      await wordRepository.update({ id: word.id }, {
        vocable: word.vocable,
        language: word.language,
        type: word.type,
        meaning: word.meaning,
        about: word.about,
        seeToo: word.seeToo,
      });

      const updatedWord = await wordRepository.findOneOrFail({ id: word.id });

      res.status(201).json({ updatedWord });

    } catch (error) {
      throw new AppError(error);
    }
  }
}