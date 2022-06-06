import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "./inputs/Input";
import FormCard from "./FormCard";

function SendMessageForm(props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [users, setUsers] = useState([]);

  const redirect = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const sendMessage = (message) => {
    axios
      .post("http://localhost:5000/api/message", {
        recipientMessage: message.recipientMessage,
        title: message.title,
        bodyMessage: message.bodyMessage,
        authorMessage: message.authorMessage,
      })
      .then((message) => redirect("/messages"))
      .catch((error) => console.log(error));
  };

  const getUsers = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then((users) => setUsers(users.data))
      .catch((error) => console.log(error));
  };

  const formik = useFormik({
    initialValues: {
      recipientMessage: "",
      title: "",
      bodyMessage: "",
      authorMessage: props.userName,
    },
    validationSchema: Yup.object({
      recipientMessage: Yup.string()
        .min(2, "Must be 2 characters or more")
        .max(20, "Must be 20 characters or less")
        .required("Required Field!"),
      title: Yup.string()
        .min(2, "Must be 2 characters or more")
        .max(20, "Must be 20 characters or less")
        .required("Required Field!"),
      bodyMessage: Yup.string()
        .max(500, "Must be 20 characters or less")
        .required("Required Field!"),
    }),
    onSubmit: (values) => {
      setIsSubmit(true);
      sendMessage(values);
    },
  });

  const invalidSubmitRecipientMessage =
    formik.touched.recipientMessage && formik.errors.recipientMessage;
  const invalidSubmitTitle = formik.touched.title && formik.errors.title;
  const invalidSubmitBodyMessage =
    formik.touched.bodyMessage && formik.errors.bodyMessage;
  const invalidSubmit =
    invalidSubmitBodyMessage ||
    invalidSubmitTitle ||
    invalidSubmitRecipientMessage;

  const usersList = users.map((user) => {
    return <option value={user.name} key={user._id} />;
  });

  return (
    <FormCard titleForm="Send your message">
      <form onSubmit={formik.handleSubmit}>
        <Input
          onChange={formik.handleChange}
          value={formik.values.recipientMessage}
          list="datalistOptions"
          type="text"
          placeholder="recipientMessage"
          htmlId="recipientMessage"
          invalidSubmit={invalidSubmitRecipientMessage}
        >
          <datalist id="datalistOptions">{usersList}</datalist>
          {invalidSubmitRecipientMessage ? (
            <div className="invalid-tooltip" style={{ display: "block" }}>
              {formik.errors.recipientMessage}
            </div>
          ) : null}
        </Input>
        <Input
          onChange={formik.handleChange}
          value={formik.values.title}
          type="text"
          placeholder="title"
          htmlId="title"
          invalidSubmit={invalidSubmitTitle}
        >
          {invalidSubmitTitle ? (
            <div className="invalid-tooltip" style={{ display: "block" }}>
              {formik.errors.title}
            </div>
          ) : null}
        </Input>
        <div className="form-floating mb-3">
          <textarea
            onChange={formik.handleChange}
            value={formik.values.bodyMessage}
            id="bodyMessage"
            placeholder="textarea"
            className={`form-control ${
              invalidSubmitBodyMessage ? "is-invalid" : ""
            }`}
            style={{ height: "200px" }}
          />
          <label htmlFor="bodyMessage">Enter your message</label>
          {invalidSubmitBodyMessage ? (
            <div className="invalid-tooltip" style={{ display: "block" }}>
              {formik.errors.bodyMessage}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={invalidSubmit || isSubmit ? true : false}
        >
          ENTER
        </button>
      </form>
    </FormCard>
  );
}

export default SendMessageForm;
