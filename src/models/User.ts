import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { ChangesHistory } from "./ChangesHistory";
import { Pages } from "./Pages";
import { Word } from "./Word";

@Entity('users')
class User {

  @PrimaryColumn()
  readonly id: string;

  @OneToMany(type => Word, user => User)
  words: Word[];

  @OneToMany(type => Pages, user => User)
  pages: Pages[]

  @OneToMany(type => ChangesHistory, user => User)

  // @Column({ name: 'deleted_at' })
  // deletedAt: boolean

  @Column()
  email: string;

  @Column({ name: 'user_name' })
  userName: string;

  @Column()
  password: string;

  // @Column({ name: 'question_0' })
  // question0: number;

  // @Column({ name: 'question_1' })
  // question1: number;

  // @Column({ name: 'question_2' })
  // question2: number;

  // @Column({ name: 'answer_0' })
  // answer0: string;

  // @Column({ name: 'answer_1' })
  // answer1: string;

  // @Column({ name: 'answer_2' })
  // answer2: string;

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { User };