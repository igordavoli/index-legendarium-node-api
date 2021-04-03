import { getCustomRepository } from 'typeorm';
import { EditHistoricalRepository } from '../repositories/EditHistoricalRepository';

// interface Historical {
//   user_id: string;
//   word_id: number;
//   vocable: string;
//   language: string;
//   type: string;
//   meaning: string;
//   about: string;
//   pages: string;
//   see_too: string;
// }


//class EditHistoricalController {
async function saveHistorical(
  user_id: string,
  word_id: string,
  vocable: string,
  language: string,
  type: string,
  meaning: string,
  about: string,
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
    see_too,
  })

  await editHistoricalRepository.save(historical)
}

export default saveHistorical;