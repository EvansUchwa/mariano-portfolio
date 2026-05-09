"use client";
import { workFields } from "@/config/form/fieldsArray";
import { WorkAddSchema, WorkUpSchema } from "@/config/form/fieldsValidations";
import useCustomQuery from "@/hooks/useQuery";
import useModalStore from "@/stores/modal";
import { ProjectsWithSubModel } from "@/types/model";
import { FormButton } from "@/uikits/buttons";
import FormFieldProvider from "@/uikits/form";
import { DataSpinner } from "@/uikits/others";
import {
  reqErrorAlertDisplayer,
  reqSuccessAlertDisplayer,
} from "@/utils/others";
import axios from "axios";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";

function formatCheckboxDefaultValue(defValue: ProjectsWithSubModel[]) {
  const newArray = [];
  if (defValue && defValue.length > 0) {
    for (let k = 0; k < defValue.length; k++) {
      const element = defValue[k];
      newArray.push(element.id);
    }
  }

  return newArray;
}
interface ArticleFormValues {
  title: string;
  link: string;
  description: string;
  banner: File | string;
  technologies: string[];
}

type AOUWorkProps = {
  work?: ProjectsWithSubModel;
  refetch: () => void;
};
export function AOUWork({ work, refetch }: AOUWorkProps) {
  const { data, isLoading } = useCustomQuery("/api/skill");
  const formik = useFormik<ArticleFormValues>({
    initialValues: {
      title: work?.title ?? "",
      link: work?.link ?? "",
      banner: "",
      description: work?.description ?? "",
      technologies: formatCheckboxDefaultValue(work?.technologies) ?? [],
    },
    onSubmit: handleSubmit,
    validationSchema: work ? WorkUpSchema : WorkAddSchema,
    validateOnMount: true,
  });
  const { isSubmitting, isValid, setSubmitting } = formik;
  const toggleModal = useModalStore((state) => state.toggle);

  function handleSubmit(formValues: ArticleFormValues) {
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("link", formValues.link);
    formData.append("description", formValues.description);
    for (let i = 0; i < formValues.technologies.length; i++) {
      const element = formValues.technologies[i];
      formData.append("technologies", element);
    }

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

  if (isLoading) return <DataSpinner />;
  return (
    <div className="manage-articles">
      <FormikProvider value={formik}>
        <Form>
          {workFields.map((item, i) => (
            <FormFieldProvider
              {...item}
              key={"work field nb" + i}
              options={item.fieldType == "checkbox" ? data : []}
            />
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
