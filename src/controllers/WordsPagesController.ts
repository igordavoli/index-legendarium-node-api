// import { getCustomRepository } from 'typeorm';
// import { WordsPagesRepository } from '../repositories/WordsPages';

// class WordsPagesController {

//   save(pages: string, wordId: string) {
//     const wordsPagesRepository = getCustomRepository(WordsPagesRepository);

//     const pagesArr = pages.split(', ');

//     pagesArr.forEach(async (page) => {
//       const wordPage = wordsPagesRepository.create({
//         word_id: wordId,
//         page: Number(page)
//       });

//       await wordsPagesRepository.save(wordPage)
//     })
//   }

//   async getByWordId(word_id: string) {
//     const wordsPagesRepository = getCustomRepository(WordsPagesRepository);

//     const pages = await wordsPagesRepository
//       .createQueryBuilder('words_pages')
//       .select(['words_pages.page'])
//       .where({ word_id })
//       .getMany();
//     console.log(pages)

//     return pages;
//   }

// }
// export { WordsPagesController };