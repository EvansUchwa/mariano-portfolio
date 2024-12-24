"use client";
import { FileFieldType } from "@/types/form.d";
import { useField } from "formik";
import React from "react";
import { FormikErrorMessage } from ".";

export function FormikFileInput(props: FileFieldType) {
  const { name, label, accept } = props;
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  return (
    <div className="formFieldFile flex f-column">
      <label>{label}</label>

      <section>
        <input
          type="file"
          name={name}
          id={"fileInp-" + name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
              setValue(e.target.files[0]);
            }
          }}
          accept={accept ? accept : ""}
        />
        <label
          htmlFor={"fileInp-" + name}
          className={value ? "fileSelected" : ""}
        >
          {!value && <span>Choisir un fichier</span>}
          {value && (
            <>
              {value.name}
              <small onClick={() => setValue("")}>Supprimer</small>
            </>
          )}
        </label>
      </section>
      <FormikErrorMessage name={name} />
    </div>
  );
}
