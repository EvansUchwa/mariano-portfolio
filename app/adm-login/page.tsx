"use client";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { FormButton } from "@/uikits/buttons";
import FormFieldProvider from "@/uikits/form";
import { loginFields } from "@/config/form/fieldsArray";
import useAuthStore from "@/stores/auth";
import axios from "axios";

interface LoginI {
  email: string;
  password: string;
}
function AdmLogin() {
  const formik = useFormik<LoginI>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
  });
  const { isSubmitting, isValid } = formik;
  const login = useAuthStore((state) => state.login);

  function handleSubmit(formValues: LoginI) {
    axios
      .post("/api/login", formValues)
      .then((res) => login())
      .catch((err) => alert("Erreur survenue"));
  }
  return (
    <div className="login">
      <h1>Se connecter</h1>
      <FormikProvider value={formik}>
        <Form>
          {loginFields.map((item, i) => (
            <FormFieldProvider {...item} key={"login field nb" + i} />
          ))}
          <FormButton
            text="Se connecter"
            isValid={isValid}
            isSubmitting={isSubmitting}
          />
        </Form>
      </FormikProvider>
    </div>
  );
}

export default AdmLogin;
