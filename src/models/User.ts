import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  is_deleted: number

  @Column()
  email: string;

  @Column()
  user_name: string;

  @Column(
    // { select: false }
  )
  password: string;

  @Column()
  question_0: number;

  @Column()
  question_1: number;

  @Column()
  question_2: number;

  @Column()
  answer_0: string;

  @Column()
  answer_1: string;

  @Column()
  answer_2: string;

  @CreateDateColumn()
  readonly created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { User };