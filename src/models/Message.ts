import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
// import { v4 as uuidv4 } from 'uuid';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field()
  text: string;

  @Field()
  sendingTime: string;

  @Field(() => User)
  sender: User;

  constructor(text: string, sender: User,  id: string) {
    const now = new Date();

    const ukraineTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Kiev" }));
    
    const year = ukraineTime.getFullYear();
    const month = String(ukraineTime.getMonth() + 1).padStart(2, '0');
    const day = String(ukraineTime.getDate()).padStart(2, '0');
    const hours = String(ukraineTime.getHours()).padStart(2, '0');
    const minutes = String(ukraineTime.getMinutes()).padStart(2, '0');
    const seconds = String(ukraineTime.getSeconds()).padStart(2, '0');
    
    const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    
    // this.id = uuidv4(); 
    this.id = id
    this.text = text;
    this.sendingTime = time;
    this.sender = sender;
  }
}
