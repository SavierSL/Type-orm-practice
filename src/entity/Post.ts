import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
} from "typeorm";
import Model from "./Model";
import { User } from "./User";

@Entity("posts") //decorators
export class Post extends Model {
  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => User)
  user: User;
}
