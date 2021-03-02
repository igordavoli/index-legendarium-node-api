import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('words')
export default class Words {
  @PrimaryGeneratedColumn()
  id: number;

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