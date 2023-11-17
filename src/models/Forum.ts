import { Entity, Column, BaseEntity, ManyToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
// import { v4 as uuidv4 } from 'uuid'; 

@ObjectType()
@Entity()
export class Forum extends BaseEntity {
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.forums)
  members: User[];

  @Column("uuid", { array: true, default: [] }) 
  messageIds: string[];

  constructor(name: string, id: string) {
    super();
    // this.id = uuidv4(); 
    this.id=id
    this.name = name;
    this.members = [];
    this.messageIds = [];
  }
}
