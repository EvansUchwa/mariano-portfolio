"use client";
import { articleFields } from "@/config/form/fieldsArray";
import useAuthStore from "@/stores/auth";
import useModalStore from "@/stores/modal";
import { ArticleWithAutorAndBanner } from "@/types/global";
import { Button, FormButton } from "@/uikits/buttons";
import FormFieldProvider from "@/uikits/form";
import { Articles, User } from "@prisma/client";
import axios from "axios";
import dayjs from "dayjs";
import { Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

type ArticleCardType = {
  article: ArticleWithAutorAndBanner;
  refetch: () => void;
};

interface ArticleFormValues {
  title: string;
  content: string;
  description: string;
  media: File | string;
}

type AOUArticleProps = {
  user: User;
  article?: Articles;
  refetch: () => void;
};
export function AOUArticle({ user, article, refetch }: AOUArticleProps) {
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
    if (!user) {
      alert("You must be logged in to create an article");
      return;
    }

    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("content", formValues.content);

    formData.append("autor", user.id);
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
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
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
            text="Ajouter"
            isValid={isValid}
            isSubmitting={isSubmitting}
          />
        </Form>
      </FormikProvider>
    </div>
  );
}
export function ArticleCard({ article, refetch }: ArticleCardType) {
  const router = useRouter();
  const { id, title, description, banner, createdAt, autor, views } = article;
  const user = useAuthStore((state) => state.user);
  const toggleModal = useModalStore((state) => state.toggle);

  return (
    <div className="articleCard flex f-column">
      <div
        className="ac-top flex f-column"
        onClick={() => router.push("/article/" + id)}
      >
        <img src={banner.url} alt="" />
        <p className="flex ai-c">
          <span>{dayjs(createdAt).format("DD/MM/YYYY")}</span>
          <span>{autor.fullname}</span>
          <span>{views.length} vue(s) </span>
        </p>
        <b>{title}</b>
        <p>{description}</p>
      </div>
      {user && (
        <div className="ac-bottom flex">
          <Button
            variant="update"
            onClick={() =>
              toggleModal(
                <AOUArticle refetch={refetch} user={user} article={article} />
              )
            }
          >
            Modifier
          </Button>
          <Button variant="delete" onClick={() => alert("Supprimer")}>
            Supprimer
          </Button>
        </div>
      )}
    </div>
  );
}
