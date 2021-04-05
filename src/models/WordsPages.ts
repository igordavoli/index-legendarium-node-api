import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Word } from "./Word";

@Entity('words_pages')
class WordsPages {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  word_id: string

  @ManyToMany(() => Word)
  @JoinColumn({ name: 'word_id' })
  word: Word

  @Column()
  page: number
}

export { WordsPages };