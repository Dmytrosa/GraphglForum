import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Message } from "../models/Message";
import { User } from '../models/User';
import { Forum } from '../models/Forum';
import { user1, user2, user3, user4 } from '../fixtures/users';
import { message1, message2, message3 } from '../fixtures/messages';
import { forum1, forum2, forum3 } from '../fixtures/forums';

// Define arrays to store users, forums, messages
const users: User[] = [user1, user2, user3, user4];

const forums: Forum[] = [forum1, forum2, forum3]

const messages: Message[] = [message1, message2, message3];

// Initialize forum memberships and message associations
forum1.members.push(user1, user2, user3);
forum2.members.push(user2);
forum3.members.push(user3, user2, user1);

forum1.messageIds.push(message1.id);
forum2.messageIds.push(message2.id);
forum3.messageIds.push(message3.id);

@Resolver()
export class ForumResolver {
  @Query(() => [Forum])
    // Query to see forums that a user has already joined
  async previewForums(@Arg("userId") userId: string): Promise<Forum[]> {

    const user = users.find((u) => u.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    const joinedForums = forums.filter((forum) =>
      forum.members.some((member) => member.id === userId)
    );

    return joinedForums;
  }
  @Query(() => [Forum])
      // Query to see forums that a user could joined
  async availableForums(@Arg("userId") userId: string): Promise<Forum[]> {
    const user = users.find((u) => u.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    const availableForums = forums.filter((forum) =>
      !forum.members.some((member) => member.id === userId)
    );

    return availableForums;
  }
  @Query(() => [User])
    // Query to see members of a specific forum
  async forumMembers(@Arg("forumId") forumId: string): Promise<User[]> {
    const forum = forums.find((f) => f.id === forumId);
    if (!forum) {
      throw new Error('Forum not found');
    }
    return forum.members;
  }
  @Query(() => [Message])
  async forumMessages(@Arg("forumId") forumId: string): Promise<Message[]> {
    try {
      // Find the forum by forumId
      const forum = forums.find((f) => f.id === forumId);
  
      if (!forum) {
        throw new Error("Forum not found");
      }
  
      // Filter messages based on messageIds stored in the forum
      const mes = messages.filter((message) => forum.messageIds.includes(message.id));
  
      return mes || [];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  @Mutation(() => Forum)
    // Mutation to create a new forum
  async createForum(@Arg("userId") userId: string, @Arg("name")  name: string): Promise<Forum> {
    // Create a new forum and add the user as a member
    let user =  users.find((u) => u.id == userId);
    if (!user) {
      throw new Error('User not found');
    }

    let ts =  Date.now();
    
    const newForum = new Forum(name, String(ts));
    newForum.members.push(user);
    forums.push(newForum);
    return newForum;
  }
  @Mutation(() => Boolean)
    // Mutation to join cpecific user to specific forum
  async joinForum(@Arg("userId") userId: string, @Arg("forumId") forumId: string): Promise<boolean> {
    // Find the user by userId
    const user = users.find((u) => u.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    // Find the forum by forumId
    const forum = forums.find((f) => f.id === forumId);
    if (!forum) {
      throw new Error("Forum not found");
    }
    // Check if the user is already a member of the forum
    if (forum.members.some((member) => member.id === userId)) {
      throw new Error("User is already a member of the forum");
    }
    // Add the user to the forum's members
    forum.members.push(user);
    return true; // Return a boolean indicating success
  }

  @Mutation(() => Message)
    // Mutation to create a new message
  async postMessage(@Arg("userId") userId: string, @Arg("forumId") forumId: string, @Arg("text") text: string): Promise<Message> {
    // Find the user by userId
    const user = users.find((u) => u.id === userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Find the forum by forumId
    const forum = forums.find((f) => f.id === forumId);
    if (!forum) {
      throw new Error("Forum not found");
    }

    // Create a new message
    let ts =  Date.now()

    const message = new Message(text, user, String(ts));

    // Add the message to the forum's messageIds array
    forum.messageIds.push(message.id);

    // Push the message to the messages array
    messages.push(message);

    return message;
  }
}