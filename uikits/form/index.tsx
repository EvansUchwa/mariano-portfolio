import React from "react";
import { FormikSharedTextInput, FormikTextArea } from "./simpleText";
import { FormikPasswordInput } from "./password";
import { FormikRadioInput } from "./choices";
import { FormikSelect } from "./select";
import { ErrorMessage } from "formik";
import { FormikFileInput } from "./file";
import { FormikWYSIWGInput } from "./others";

interface FormFieldProps {
  fieldType: string;
  name: string;
  label: string;
  placeholder?: string;
  options?: Record<string, any>[];
  valueKey?: string;
  labelKey?: string;
}

function FormFieldProvider(props: FormFieldProps) {
  const { fieldType } = props;
  const sharedType: string[] = [
    "email",
    "text",
    "address",
    "number",
    "date",
    "time",
  ];
  if (sharedType.includes(fieldType))
    return <FormikSharedTextInput {...props} />;
  else if (fieldType == "password") return <FormikPasswordInput {...props} />;
  else if (fieldType == "radio") return <FormikRadioInput {...props} />;
  else if (fieldType == "file") return <FormikFileInput {...props} />;
  else if (fieldType == "textarea") return <FormikTextArea {...props} />;
  else if (fieldType == "select") return <FormikSelect {...props} />;
  else if (fieldType == "wysiwyg") return <FormikWYSIWGInput {...props} />;
  return <></>;
}

type FormikErrorMessageProps = {
  name: string;
};
export function FormikErrorMessage({ name }: FormikErrorMessageProps) {
  return (
    <>
      <span className="errorMessageOnField">
        <ErrorMessage name={name} render={(error) => error + "*"} />
      </span>
    </>
  );
}
export default FormFieldProvider;
