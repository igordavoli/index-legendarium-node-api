import { EntityRepository, Repository } from 'typeorm';
import { WordsPages } from '../models/WordsPages';

@EntityRepository(WordsPages)
class WordsPagesRepository extends Repository<WordsPages> { }

export { WordsPagesRepository };
