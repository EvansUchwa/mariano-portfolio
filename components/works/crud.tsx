"use client";
import { workFields } from "@/config/form/fieldsArray";
import useModalStore from "@/stores/modal";
import { FormButton } from "@/uikits/buttons";
import FormFieldProvider from "@/uikits/form";
import {
  reqErrorAlertDisplayer,
  reqSuccessAlertDisplayer,
} from "@/utils/others";
import { Projects } from "@prisma/client";
import axios from "axios";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";

interface ArticleFormValues {
  title: string;
  link: string;
  description: string;
  banner: File | string;
}

type AOUWorkProps = {
  work?: Projects;
  refetch: () => void;
};
export function AOUWork({ work, refetch }: AOUWorkProps) {
  const formik = useFormik<ArticleFormValues>({
    initialValues: {
      title: work?.title ?? "",
      link: work?.link ?? "",
      banner: "",
      description: work?.description ?? "",
    },
    onSubmit: handleSubmit,
  });
  const { isSubmitting, isValid, setSubmitting } = formik;
  const toggleModal = useModalStore((state) => state.toggle);

  function handleSubmit(formValues: ArticleFormValues) {
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("link", formValues.link);
    formData.append("description", formValues.description);

    if (formValues.banner) {
      formData.append("media", formValues.banner);
    }
    if (work) {
      formData.append("workId", work.id);
    }

    const request = work
      ? axios.put("/api/work/", formData)
      : axios.post("/api/work/", formData);
    request
      .then((res) => reqSuccessAlertDisplayer(res))
      .catch((err) => reqErrorAlertDisplayer(err))
      .finally(() => {
        setSubmitting(false);
        toggleModal();
        refetch();
      });
  }
  return (
    <div className="manage-articles">
      <FormikProvider value={formik}>
        <Form>
          {workFields.map((item, i) => (
            <FormFieldProvider {...item} key={"work field nb" + i} />
          ))}
          <FormButton
            text={work ? "Sauvegarder" : "Ajouter"}
            isValid={isValid}
            isSubmitting={isSubmitting}
          />
        </Form>
      </FormikProvider>
    </div>
  );
}

export function deleteWork(workId: string, fcb: () => void) {
  axios
    .delete("/api/work?id=" + workId)
    .then((res) => reqSuccessAlertDisplayer(res))
    .catch((err) => reqErrorAlertDisplayer(err))
    .finally(() => {
      fcb();
    });
}
