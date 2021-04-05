import { getCustomRepository } from 'typeorm';
import { WordsPagesRepository } from '../repositories/WordsPages';

const WordsPagesController = (pages: string, wordId: string) => {
  const wordsPagesRepository = getCustomRepository(WordsPagesRepository);

  const pagesArr = pages.split(', ');

  pagesArr.forEach(async (page) => {
    const wordPage = wordsPagesRepository.create({
      word_id: wordId,
      page: Number(page)
    });

    await wordsPagesRepository.save(wordPage)
  })
}

export { WordsPagesController };