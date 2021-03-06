
import { EntityRepository, Repository } from 'typeorm';
import { EditHistorical } from '../models/EditHistorical';

@EntityRepository(EditHistorical)
class EditHistoricalRepository
  extends Repository<EditHistorical> {
}

export { EditHistoricalRepository };