import React, { useEffect, useState } from "react";
import axios from "axios";

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
    console.log("useEffect : ", userName);
    getMessages(userName);
  }, [userName]);

  console.log(messages);

  return <div>Messages</div>;
}

export default Messages;
