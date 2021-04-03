import { Entity, Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity('words')
class Word {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  created_by: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  user: User

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
  see_too: string;

  @CreateDateColumn()
  readonly created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }

}

export { Word };