import { getCustomRepository } from 'typeorm';
import { EditHistoricalRepository } from '../repositories/EditHistoricalRepository';

//class EditHistoricalController {
async function saveHistorical(
  user_id: string,
  word_id: number,
  vocable: string,
  language: string,
  type: string,
  meaning: string,
  about: string,
  pages: string,
  see_too: string,
) {

  const editHistoricalRepository = getCustomRepository(EditHistoricalRepository);

  const historical = editHistoricalRepository.create({
    user_id,
    word_id,
    vocable,
    language,
    type,
    meaning,
    about,
    pages,
    see_too,
  })

  await editHistoricalRepository.save(historical)
}

//}
//export default EditHistoricalController;
export default saveHistorical;