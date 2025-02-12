import React from "react";
import { Field, useField } from "formik";
import { RadioFieldType } from "@/types/form.d";
import { FormikErrorMessage } from ".";

export function FormikRadioInput({
  name,
  label,
  options,
  valueKey,
  labelKey,
}: RadioFieldType) {
  const [field, meta, helpers] = useField(name);
  const { value } = meta;

  function handleChange(e: React.MouseEvent<HTMLInputElement>) {
    if (value == e.currentTarget.value) {
      helpers.setValue("");
    } else {
      helpers.setValue(e.currentTarget.value);
    }
  }
  return (
    <div className="formField formFieldRadio">
      <label htmlFor="">{label}</label>
      <div className="flex f-wrap">
        {options.map((item, i) => (
          <label
            className="flex"
            htmlFor={name + "chk-" + value + i}
            key={"radion nb" + i}
          >
            <input
              type="radio"
              name={name}
              value={item[valueKey]}
              checked={value == item[valueKey]}
              id={name + "chk-" + value + i}
              onClick={handleChange}
            />
            <p>{item[labelKey]}</p>
          </label>
        ))}
      </div>
      <FormikErrorMessage name={name} />
    </div>
  );
}

export function FormikCheckboxInput({
  name,
  label,
  options,
  valueKey,
  labelKey,
}: RadioFieldType) {
  const [meta] = useField(name);
  const { value } = meta;

  return (
    <div className="formField formFieldRadio">
      <label htmlFor="">{label}</label>
      <div className="flex f-wrap">
        {options.map((item, i) => (
          <label
            className="flex"
            htmlFor={name + "chk-" + value + i}
            key={"radion nb" + i}
          >
            <Field
              type="checkbox"
              name={name}
              value={item[valueKey]}
              checked={value.includes(item[valueKey])}
              id={name + "chk-" + value + i}
            />
            <p>{item[labelKey]}</p>
          </label>
        ))}
      </div>
      <FormikErrorMessage name={name} />
    </div>
  );
}
