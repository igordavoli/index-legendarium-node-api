import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { WordRepository } from '../repositories/WordRepository';
import { UserRepository } from '../repositories/UserRepository';
import { AppError } from '../errors/AppError';
import { Pages } from '../models/Pages';
//import { PagesRepository } from '../repositories/PagesRepository';

export class WordsController {

  async query(req: Request, res: Response) {

    const wordRepository = getCustomRepository(WordRepository);
    const { search } = req.query;

    if (!search) {
      throw new AppError('Empty search nothing was returned.', 400);
    }

    const _search = String(search).trim();
    const words = await wordRepository.find({ vocable: Like(String(_search)) });

    if (words.length === 0) {
      throw new AppError('Word not found!', 404);
    }

    res.status(200).json(words);
  }

  async create(req: Request, res: Response) {
    try {
      const userRepository = getCustomRepository(UserRepository);
      const wordRepository = getCustomRepository(WordRepository);
      //const pagesRepository = getCustomRepository(PagesRepository);

      const userId = req.body.decoded.id;
      const { word } = req.body;

      if (!word.vocable) {
        throw new AppError('Vocable is a required field!', 400);
      }

      await userRepository.findOneOrFail({ id: userId });

      const hasWord = await wordRepository.findOne({ vocable: Like(word.vocable) });

      if (hasWord) {
        throw new AppError('Word already exists!', 409);
      }

      const _pages = word.pages.split(',').map((page: string) => Number(page));

      const PagesArr = _pages.map((page: number) => {
        //   return pagesRepository.create({ page, createdBy: userId });
      })

      //  await pagesRepository.save(PagesArr);

      const newWord = wordRepository.create({
        //  pages: PagesArr,
        createdBy: userId,
        vocable: word.vocable,
        language: word.language,
        type: word.type,
        meaning: word.meaning,
        about: word.about,
        seeToo: word.seeToo
      });

      await wordRepository.save(newWord);

      const savedWord = await wordRepository.findOneOrFail({ vocable: word.vocable })

      res.status(201).json({ savedWord });

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