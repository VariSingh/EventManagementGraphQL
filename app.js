require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
//const { MONGODB_URL, MONGODB_PORT, DB_NAME } = require("./utils/config");
const mongoose = require("mongoose");
mongoose
  .connect(`mongodb://localhost:27017/event-management`)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("error", error);
  });

const Event = require("./models/events");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { config } = require("./utils/config");

var app = express();

const events = [];

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input EventInput {
      title:String!
      description: String!
      price:Float!
      date:String!
    }

    type RootQuery {
      events: [Event!]!
    }
    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }
      schema {
        query:RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: async () => {
        try {
          return await Event.find();
        } catch (error) {
          console.log("error ", error);
        }
      },
      createEvent: async (args) => {
        try {
          const { title, description, price, date } = args.eventInput;
          const event = new Event({
            title: title,
            description: description,
            price: +price,
            date: new Date(date),
          });
          return await event.save();
        } catch (error) {
          console.log("error while creating event ", error);
        }
      },
    },
    graphiql: true,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
