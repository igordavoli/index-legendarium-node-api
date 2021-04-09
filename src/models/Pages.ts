import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Word } from "./Word";

@Entity('pages')
class Pages {

  @PrimaryColumn()
  page: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(type => User, pages => Pages)
  @JoinColumn({ name: 'created_by' })
  createdBy: string;

  @ManyToMany(() => Word, word => word.pages, {
    cascade: true
  })
  words: Word[];

}

export { Pages };