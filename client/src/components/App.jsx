import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./forms/LoginForm";
import SendMessageForm from "./forms/SendMessageForm";
import Messages from "./messages/Messages";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <BrowserRouter>
      <div className="container">
        {userName ? (
          <Routes>
            <Route path="/" element={<Navigate to="/messages" />} />
            <Route
              path="/messages"
              element={<Messages userName={userName} />}
            />
            <Route
              path="/message"
              element={<SendMessageForm userName={userName} />}
            />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              element={<LoginForm setUserName={setUserName} />}
            />
            <Route path="/messages" element={<Navigate to="/login" />} />
            <Route path="/message" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
