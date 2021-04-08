import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('pages')
class Pages {

  @PrimaryColumn()
  page: number

  @Column({ name: 'created_at' })
  createdAt: Date;


  @ManyToOne(type => User, pages => Pages)
  @JoinColumn({ name: 'created_by' })
  createdBy: string
}

export { Pages };