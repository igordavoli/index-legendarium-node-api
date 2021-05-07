import { getCustomRepository, Like, Repository } from "typeorm";
import { AppError } from "../errors/AppError";
import { User } from "../models/User";
import { Word } from "../models/Word";
import { UserRepository } from "../repositories/UserRepository";
import { WordRepository } from "../repositories/WordRepository";
import { UserService } from "./UserService";

interface INewWord {
  vocable: string;
  language: string;
  type: string;
  meaning: string;
  pages: string;
  about: string;
  seeToo: string;
}

class WordService {
  private repository: Repository<Word>;
  private userRepository: Repository<User>;

  constructor() {
    this.repository = getCustomRepository(WordRepository);
    this.userRepository = getCustomRepository(UserRepository);
  }

  async search(search: string) {

    const words = await this.repository.find({ vocable: Like(String(search)) });

    return words;
  }


  async create(word: INewWord, userId: string) {

    //const pagesRepository = getCustomRepository(PagesRepository);

    if (!word.vocable) {
      throw new AppError('Vocable is a required field!', 400);
    }

    const user = await this.userRepository.findOneOrFail({ id: userId });

    const hasWord = await this.repository.findOne({ vocable: Like(word.vocable) });

    if (hasWord) {
      throw new AppError('Word already exists!', 409);
    }

    const _pages = word.pages.split(',').map((page: string) => Number(page));

    const PagesArr = _pages.map((page: number) => {
      //   return pagesRepository.create({ page, createdBy: userId });
    })

    //  await pagesRepository.save(PagesArr);

    const newWord = this.repository.create({
      //  pages: PagesArr,
      vocable: word.vocable,
      language: word.language,
      type: word.type,
      meaning: word.meaning,
      about: word.about,
      seeToo: word.seeToo,
    });

    newWord.createdBy = user;

    const savedWord = await this.repository.save(newWord);

    return savedWord;
  }

  async findById(id: string) {
    const word = await this.repository.findOneOrFail(id);

    return word;
  }

}

export { WordService };