import { getCustomRepository } from 'typeorm';
import { ChangesHistoryRepository } from '../repositories/ChagesHistoryRepository';

// interface Historical {
//   userId: string;
//   wordId: number;
//   vocable: string;
//   language: string;
//   type: string;
//   meaning: string;
//   about: string;
//   pagT: string;
//   see_too: string;
// }


//class EditHistoricalController {

async function saveHistorical(
  vocable: string,
  language: string,
  type: string,
  meaning: string,
  about: string,
  seeToo: string,
) {

  const changesHistoryRepository = getCustomRepository(ChangesHistoryRepository);

  const historical = changesHistoryRepository.create({
    vocable,
    language,
    type,
    meaning,
    about,
    seeToo,
  })

  await changesHistoryRepository.save(historical)
}

export default saveHistorical;