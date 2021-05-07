import { EntityRepository, Repository } from 'typeorm';
import { Word } from '../models';

@EntityRepository(Word)
class WordRepository extends Repository<Word> { }

export { WordRepository };
