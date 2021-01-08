import { IsEmail, Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import Model from "./Model";
import { Post } from "./Post";

@Entity("users") //decorators
export class User extends Model {
  @Column()
  @Length(1, 255)
  name: string;

  @Column()
  @Length(1, 255)
  @IsEmail()
  email: string;

  //   @Column({
  //     type: "enum",
  //     enum: ["user", "admin"],
  //     default: "user";
  //   })
  //    @isEnum(["user", "admin", undefined])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
