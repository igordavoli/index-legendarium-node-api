import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./User";
import { Word } from "./Word";

@Entity('edit_historical')
class EditHistorical {

  @PrimaryColumn()
  readonly id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @ManyToOne(() => Word)
  @JoinColumn({ name: 'word_id' })
  word: Word;

  @Column()
  word_id: number;

  @Column()
  vocable: String;

  @Column()
  language: String;

  @Column()
  type: String;

  @Column()
  meaning: String;

  @Column()
  about: String;

  @Column()
  pages: String;

  @Column()
  see_too: String;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { EditHistorical };