import { getCustomRepository } from 'typeorm';
import { EditHistoricalRepository } from '../repositories/EditHistoricalRepository';

//class EditHistoricalController {
async function saveHistorical(
  user_id: String,
  word_id: Number,
  vocable: String,
  language: String,
  type: String,
  meaning: String,
  about: String,
  pages: String,
  see_too: String,
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