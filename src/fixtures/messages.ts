import { Message } from "../models/Message";
import { user1, user2, user3 } from "./users";

export const message1 = new Message("It`s soooo good, I love it!", user1, "1")
export const message2 = new Message("I hate fruits!", user2, "2");
export const message3 = new Message("Does anyone has a paw wax?", user3, "3");