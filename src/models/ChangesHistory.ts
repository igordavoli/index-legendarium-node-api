import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./User";
import { Word } from "./Word";

@Entity('changes_history')
class ChangesHistory {

  @PrimaryColumn()
  readonly id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ name: 'created_by' })
  createdBy: string;

  @ManyToOne(type => User, changesHistory => ChangesHistory)
  @JoinColumn({ name: 'created_by' })
  user: User;

  @Column({ name: 'word_id' })
  wordId: string;

  @ManyToOne(type => Word, changesHistory => ChangesHistory)
  @JoinColumn({ name: 'word_id' })
  word: Word;

  @Column()
  vocable: string;

  @Column()
  language: string;

  @Column()
  type: string;

  @Column()
  meaning: string;

  @Column()
  about: string;

  @Column()
  seeToo: string;


  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { ChangesHistory };