import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./User";
import { Word } from "./Word";

@Entity('changes_history')
class ChangesHistory {

  @PrimaryColumn()
  readonly id: string;

  @ManyToOne(type => Word, changesHistory => ChangesHistory)
  @JoinColumn({ name: 'word_id' })
  wordId: Word;

  @ManyToOne(type => User, changesHistory => ChangesHistory)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

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

  @Column({ name: 'see_too' })
  seeToo: string;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { ChangesHistory };