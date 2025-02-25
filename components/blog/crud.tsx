"use client";
import { articleFields } from "@/config/form/fieldsArray";
import useModalStore from "@/stores/modal";
import { FormButton } from "@/uikits/buttons";
import FormFieldProvider from "@/uikits/form";
import {
  reqErrorAlertDisplayer,
  reqSuccessAlertDisplayer,
} from "@/utils/others";
import { Articles } from "@prisma/client";
import axios from "axios";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";

interface ArticleFormValues {
  title: string;
  content: string;
  description: string;
  media: File | string;
}

type AOUArticleProps = {
  article?: Articles;
  refetch: () => void;
};
export function AOUArticle({ article, refetch }: AOUArticleProps) {
  const formik = useFormik<ArticleFormValues>({
    initialValues: {
      title: article?.title ?? "",
      content: article?.content ?? "",
      media: "",
      description: article?.description ?? "",
    },
    onSubmit: handleSubmit,
  });
  const { isSubmitting, isValid, setSubmitting } = formik;
  const toggleModal = useModalStore((state) => state.toggle);

  function handleSubmit(formValues: ArticleFormValues) {
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("content", formValues.content);
    formData.append("description", formValues.description);

    if (formValues.media) {
      formData.append("media", formValues.media);
    }
    if (article) {
      formData.append("articleId", article.id);
    }

    const request = article
      ? axios.put("/api/article/", formData)
      : axios.post("/api/article/", formData);
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
          {articleFields.map((item, i) => (
            <FormFieldProvider {...item} key={"article field nb" + i} />
          ))}
          <FormButton
            text={article ? "Ajouter" : "Sauvegarder"}
            isValid={isValid}
            isSubmitting={isSubmitting}
          />
        </Form>
      </FormikProvider>
    </div>
  );
}

export function deleteArticle(articleId: string, fcb: () => void) {
  axios
    .delete("/api/article?id=" + articleId)
    .then((res) => reqSuccessAlertDisplayer(res))
    .catch((err) => reqErrorAlertDisplayer(err))
    .finally(() => {
      fcb();
    });
}
