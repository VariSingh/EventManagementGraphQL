const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
      creator: User!
    }

    type Booking {
      _id:ID!
      creator:User!
      event:Event!
    }

    type User {
      _id: ID!
      email:String!
      password:String
      events:[Event!]
    }

    input EventInput {
      title:String!
      description: String!
      price:Float!
      date:String!
    }

    input UserInput {
      email:String!
      password:String!
    }

    type RootQuery {
      events: [Event!]!
      users: [User!]!
      bookings: [Booking!]!
    }
    type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput):User
      createBooking(eventId:ID!): Booking
      cancelBooking(bookingId:ID!):Booking
    }
      schema {
        query:RootQuery
        mutation: RootMutation
      }
    `);
