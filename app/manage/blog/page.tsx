"use client";
import { articleFields } from "@/config/form/fieldsArray";
import useAuth from "@/hooks/useAuth";
import { FormButton } from "@/uikits/buttons";
import FormFieldProvider from "@/uikits/form";
import axios from "axios";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";

interface ArticleFormValues {
  title: string;
  content: string;
  media: File | string;
}

function ManageBlog() {
  useAuth();
  const formik = useFormik<ArticleFormValues>({
    initialValues: {
      title: "",
      content: "",
      media: "",
    },
    onSubmit: handleSubmit,
  });
  const { isSubmitting, isValid } = formik;

  function handleSubmit(formValues: ArticleFormValues) {
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("content", formValues.content);
    formData.append("media", formValues.media);

    axios
      .post("/api/article/", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => console.log("Finito"));
  }
  return (
    <div className="manage-articles">
      <FormikProvider value={formik}>
        <Form>
          {articleFields.map((item, i) => (
            <FormFieldProvider {...item} key={"article field nb" + i} />
          ))}
          <FormButton
            text="Ajouter"
            isValid={isValid}
            isSubmitting={isSubmitting}
          />
        </Form>
      </FormikProvider>
    </div>
  );
}

export default ManageBlog;
