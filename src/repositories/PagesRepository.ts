import { EntityRepository, Repository } from 'typeorm';
import { Pages } from '../models/Pages';

@EntityRepository(Pages)
class PagesRepository extends Repository<Pages> { }

export { PagesRepository };
