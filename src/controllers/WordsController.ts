import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { WordRepository } from '../repositories/WordRepository';
import { UserRepository } from '../repositories/UserRepository';
import { AppError } from '../errors/AppError';
import { WordService } from '../services';
//import { Pages } from '../models/Pages';
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
      const wordService = new WordService;
      const updatedWord = wordService.updatedWord(word, userId);

      res.status(201).json({ updatedWord });
    } catch (error) {
      throw new AppError(error);
    }
  }
}