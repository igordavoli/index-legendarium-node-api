import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Word } from "./Word";

@Entity('words_pages')
class WordsPages {

  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToMany(() => Word)
  @JoinColumn({ name: 'word_id' })
  word_id: string

  @Column()
  page: number
}

export { WordsPages };