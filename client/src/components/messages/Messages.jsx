import React, { useEffect, useState } from "react";
import axios from "axios";
import Message from "./Message";
import "bootstrap/js/dist/toast";
import Toast from "bootstrap/js/dist/toast";

function Messages(props) {
  const [messages, setMessages] = useState([]);
  const [newmessage, setNewMessage] = useState({});
  const [newmessageToast, setNewMessageToast] = useState(false);
  const { currentUser } = props;

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
    getMessages(currentUser.name);
    const socket = new WebSocket("ws://localhost:5000/");
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          id: currentUser._id,
          name: currentUser.name,
          method: "connection",
        })
      );
    };
    socket.onmessage = (e) => {
      setNewMessage(JSON.parse(e.data));
      setNewMessageToast(true);
      getMessages(currentUser.name);
    };
  }, [currentUser._id, currentUser.name]);

  const toastShow = (show) => {
    const toastLive = document.getElementById("liveToast");
    if (show) {
      const toast = new Toast(toastLive);

      toast.show();
    }
  };

  toastShow(newmessageToast);

  return (
    <>
      {messages.length > 0 ? (
        messages.map((message) => {
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
        })
      ) : (
        <div>You don't have any messages...</div>
      )}
      <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          class="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-config={{ delay: 10000 }}
        >
          <div class="toast-header">
            <strong class="me-auto">New Message</strong>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div class="toast-body">
            You have a new message from{" "}
            <strong>{newmessage.authorMessage}</strong>!
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
