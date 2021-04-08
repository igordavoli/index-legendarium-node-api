import { Entity, Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ChangesHistory } from './ChangesHistory';
import { Pages } from './Pages';
import { User } from './User';


@Entity('words')
class Word {

  @PrimaryColumn()
  readonly id: string;

  @OneToMany(type => ChangesHistory, word => Word)

  @ManyToMany(type => Pages)
  @JoinTable()
  pages: Pages

  @ManyToOne(type => User, words => Word)
  @JoinColumn({ name: 'created_by' })
  user: User

  @Column({ name: 'created_by' })
  createdBy: string;

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

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }

}

export { Word };