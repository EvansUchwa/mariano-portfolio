"use client";
import { useState } from "react";
import { Field } from "formik";
import { SharedTextFieldType } from "@/types/form.d";
import { FormikErrorMessage } from ".";
// import { PhEye, PhEyeSlash } from "../icons";

export function FormikPasswordInput(props: SharedTextFieldType) {
  const { label, name, ph } = props;
  const [pwdType, setPwdType] = useState(true);
  return (
    <div className="formField formFieldPwd flex f-column">
      <label className="flex">{label}</label>
      <section>
        <Field
          type={pwdType ? "password" : "text"}
          autoComplete="new-password"
          name={name}
          placeholder={ph}
        />
        <span
          className="pwdViewIcon"
          onClick={() => setPwdType((prev) => !prev)}
        >
          {pwdType ? "V" : "C"}
        </span>
      </section>
      <FormikErrorMessage name={name} />
    </div>
  );
}
