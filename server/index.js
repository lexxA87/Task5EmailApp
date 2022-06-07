const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/api.user.routes");
const messageRoutes = require("./routes/api.message.routes");
const Message = require("./models/Message");

const app = express();
const WSServer = require("express-ws")(app);

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(messageRoutes);

// app.ws("/", (ws, res) => {
//   console.log("WS started");
//   ws.on("message", (message) => {
//     message = JSON.parse(message);
//     switch (message.method) {
//       case "connection":
//         console.log(`Connected with ${message.id}`);
//         Message.find({ recipientMessage: message.name })
//           .sort({ createdAt: -1 })
//           .then((messages) => ws.send(JSON.stringify(messages)))
//           .catch((error) => console.log(error));
//         break;
//       case "waitForNewMessage":
//         const messagesDB = Message.watch({
//           $addFields: {
//             recipientMessage: message.name,
//           },
//         });
//         messagesDB.on("change", (e) => ws.send(JSON.stringify(e.fullDocument)));
//         break;
//       default:
//         break;
//     }
//   });
// });

app.ws("/", (ws, res) => {
  console.log("WS started");
  ws.on("message", (currentUser) => {
    currentUser = JSON.parse(currentUser);

    console.log(`Connected with ${currentUser.id}`);

    // Message.find({ recipientMessage: currentUser.name })
    //   .sort({ createdAt: -1 })
    //   .then((messages) => ws.send(JSON.stringify(messages)))
    //   .catch((error) => console.log(error));

    const messagesDB = Message.watch();

    messagesDB.on("change", (e) => {
      const newmessage = e.fullDocument;
      if (newmessage.recipientMessage == currentUser.name) {
        ws.send(JSON.stringify(newmessage));
      }
    });
  });
});

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(error)
    : console.log("Server started on PORT ", process.env.PORT);
});

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));
