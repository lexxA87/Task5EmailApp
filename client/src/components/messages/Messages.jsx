import React, { useEffect, useState } from "react";
import axios from "axios";
import Message from "./Message";

function Messages(props) {
  const [messages, setMessages] = useState([]);
  const { userName } = props;

  const getMessages = (name) => {
    axios
      .get("http://localhost:5000/api/messages", {
        params: {
          name: name,
        },
      })
      .then((messages) => setMessages(messages.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getMessages(userName);
  }, [userName]);

  return messages.map((message) => {
    return (
      <Message
        key={message._id}
        id={message._id}
        title={message.title}
        authorMessage={message.authorMessage}
        bodyMessage={message.bodyMessage}
        dateMessage={message.createdAt}
      />
    );
  });
}

export default Messages;
