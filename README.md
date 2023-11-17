# type-graphql-forum
This is type-graphql apollo serever for simple forum. Server also have some fixtures, with pre-populated forums, messages and users that are loaded onto the server memory when the server starts. 

# Installing

1. Clone and install dependecies
```
git clone
yarn
```
2. Start the server
```
yarn start
```
To verified it worked, you can go to http://localhost:4000/graphql

# Schema

User {
  id: string
  name: string
  pictureUrl: string
}

Forum {
  id: string
  name: string
  members: UserSchema[]
  messages: MessageSchema[]
}

Message {
  id: string
  text: string
  sendingTime: Date
  sender: UserSchema
}

# Usage

Server has several request types of queryes and mutations:

◙ previewForums: This query takes a userId as an argument and returns an array of forums that the user has already joined. It checks if the provided user ID exists in the users array and then filters the forums array to include only the forums where the user is a member.

query {
  previewForums(userId: "1") {
    id
    name
  }
}


◙ availableForums: This query also takes a userId as an argument but returns an array of forums that the user has not yet joined. It checks if the user exists and then filters the forums array to include only the forums where the user is not a member.

query {
  availableForums(userId: "1") {
    id
    name
  }
}


◙ forumMembers: This query takes a forumId as an argument and returns an array of users who are members of the specified forum. It checks if the forum with the given ID exists and then retrieves the members from that forum.

query {
  forumMembers(forumId: "1") {
    id
    name
  }
}


◙ forumMessages: This query takes a forumId as an argument and returns an array of messages associated with the specified forum. It retrieves the forum from the database and then finds the messages associated with the forum using the messageIds array.

query {
  forumMessages(forumId: "1") {
    id
    text
    sender {
      id
      name
      pictureUrl
    }
  }
}

☼ createForum: This mutation allows a user to create a new forum. It takes a userId and name as arguments and creates a new forum with the provided name. It then adds the user as a member of the new forum.

mutation {
  createForum(userId: "1", name: "New") {
    id
    name
  }
}

☼ joinForum: This mutation allows a user to join an existing forum. It takes a userId and forumId as arguments, finds the user and forum, and checks if the user is already a member. If not, it adds the user to the forum's members.

mutation {
  joinForum(userId: "4", forumId: "1")
}

☼ postMessage: This mutation allows a user to post a message in a forum. It takes a userId, forumId, and text as arguments, finds the user and forum, creates a new message with the provided text, and associates it with the forum by adding its ID to the forum's messageIds array.


mutation {
  postMessage(userId: "2", forumId: "1", text: "Hello!") {
    id
    text
    sendingTime
    sender {
      id
      name
      pictureUrl
    }
  }
}


