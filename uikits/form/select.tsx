"use client";
import { SelectFieldType } from "@/types/form.d";
import { useField } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { FormikErrorMessage } from ".";

export function FormikSelect(props: SelectFieldType) {
  const { name, label, valueKey, labelKey, chooseLabelKey, options } = props;
  const [toggleSelection, setToggleSelection] = useState(false);
  const [meta, helpers] = useField(name);
  const [currentValueLabel, setCVL] = useState(false);
  const { value } = meta;

  useEffect(() => {
    if (value) {
      const filt = options.filter((item: any) => item[valueKey] == value);

      if (filt && filt.length > 0) {
        setCVL(filt[0][labelKey]);
      }
    }
  }, [value]);

  return (
    <div className={"formField formFieldSelect"}>
      <label htmlFor="">{label}</label>
      <b onClick={() => setToggleSelection((prev) => !prev)} className="flex">
        {currentValueLabel ? currentValueLabel : chooseLabelKey}
      </b>
      <section className="flex f-column">
        {toggleSelection && (
          <>
            {options.map((options, i) => (
              <span
                key={"select " + name + " nb" + i}
                onClick={() => {
                  helpers.setValue(options[valueKey]);
                  setToggleSelection(false);
                }}
                className={options[valueKey] == value ? "currentSelected" : ""}
              >
                {options[labelKey]}
              </span>
            ))}
          </>
        )}
      </section>
      <FormikErrorMessage name={name} />
    </div>
  );
}
