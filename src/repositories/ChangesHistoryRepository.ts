
import { EntityRepository, Repository } from 'typeorm';
import { ChangesHistory } from '../models/ChangesHistory';

@EntityRepository(ChangesHistory)
class ChangesHistoryRepository extends Repository<ChangesHistory> { }

export { ChangesHistoryRepository };