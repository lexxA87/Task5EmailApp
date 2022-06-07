import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./forms/LoginForm";
import SendMessageForm from "./forms/SendMessageForm";
import Messages from "./messages/Messages";

function App() {
  const [user, setUser] = useState({
    _id: "",
    name: "",
  });

  return (
    <BrowserRouter>
      <div className="container">
        {user.name ? (
          <Routes>
            <Route path="/" element={<Navigate to={`/${user._id}`} />} />
            <Route
              path={`/${user._id}`}
              element={<Messages currentUser={user} />}
            />
            <Route
              path="/message"
              element={<SendMessageForm currentUser={user} />}
            />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm setUser={setUser} />} />
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
