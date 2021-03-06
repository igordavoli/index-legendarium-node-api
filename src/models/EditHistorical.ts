import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('edit_historical')
class EditHistorical {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  userName: string;

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