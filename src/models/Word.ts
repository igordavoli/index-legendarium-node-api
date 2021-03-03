import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('words')
class Word {
  @PrimaryGeneratedColumn()
  readonly id: number;

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
  pages: string;

  @Column()
  see_too: string;

  @CreateDateColumn()
  created_at: Date;

}

export { Word };