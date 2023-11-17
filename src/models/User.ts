import { Entity, Column, BaseEntity, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Message } from "./Message";
import { Forum } from "./Forum";
// import { v4 as uuidv4 } from 'uuid'; 
 

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  pictureUrl: string;

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @ManyToMany(() => Forum, (forum) => forum.members)
  @JoinTable()
  forums: Forum[];

  constructor(name: string, pictureUrl: string, id: string) {
    super();
    // this.id = uuidv4(); 
    this.id = id
    this.name = name;
    this.pictureUrl = pictureUrl;
  }
}
