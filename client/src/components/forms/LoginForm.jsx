import React, { useState } from "react";
// import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "./inputs/Input";
import FormCard from "./FormCard";

function LoginForm() {
  const [isSubmit, setIsSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Must be 2 characters or more")
        .max(20, "Must be 20 characters or less")
        .required("Required Field!"),
    }),
    onSubmit: (values) => {
      setIsSubmit(true);
      alert(JSON.stringify(values, null, 2));
    },
  });

  const invalidSubmit = formik.touched.name && formik.errors.name;

  return (
    <FormCard titleForm="Enter your name">
      <form onSubmit={formik.handleSubmit}>
        <Input
          onChange={formik.handleChange}
          value={formik.values.name}
          type="text"
          placeholder="Name"
          htmlId="name"
          invalidSubmit={invalidSubmit}
        >
          {invalidSubmit ? (
            <div className="invalid-tooltip" style={{ display: "block" }}>
              {formik.errors.name}
            </div>
          ) : null}
        </Input>
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

export default LoginForm;
