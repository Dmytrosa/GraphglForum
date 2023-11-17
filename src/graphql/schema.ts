import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class UserSchema {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  pictureUrl!: string;
}

@ObjectType()
export class ForumSchema {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => [UserSchema])
  members!: UserSchema[];

  @Field(() => [MessageSchema])
  messages!: MessageSchema[];
}

@ObjectType()
export class MessageSchema {
  @Field(() => ID)
  id!: string;

  @Field()
  text!: string;

  @Field()
  sendingTime!: Date;

  @Field(() => UserSchema)
  sender!: UserSchema;
}