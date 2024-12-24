"use client";
import { SharedTextFieldType } from "@/types/form.d";
import { Field } from "formik";
import React from "react";
import { FormikErrorMessage } from ".";

export function FormikSharedTextInput(props: SharedTextFieldType) {
  const { fieldType, label, name, ph, min, max } = props;
  return (
    <div className="formField">
      {label && <label htmlFor="">{label}</label>}
      <Field
        type={fieldType}
        name={name}
        placeholder={ph}
        min={min}
        max={max}
      />
      <FormikErrorMessage name={name} />
    </div>
  );
}

export function FormikTextArea(props: SharedTextFieldType) {
  const { fieldType, label, name, ph } = props;
  return (
    <div className="formField">
      {label && <label htmlFor="">{label}</label>}
      <Field
        type={"textarea"}
        component="textarea"
        name={name}
        placeholder={ph}
      />
      <FormikErrorMessage name={name} />
    </div>
  );
}
