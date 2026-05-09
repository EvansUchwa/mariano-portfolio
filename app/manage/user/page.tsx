"use client";
import axios from "axios";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { FormButton } from "@/uikits/buttons";
import FormFieldProvider from "@/uikits/form";
import { userInfosFields } from "@/config/form/fieldsArray";
import useAuthStore from "@/stores/auth";
import {
  reqErrorAlertDisplayer,
  reqSuccessAlertDisplayer,
} from "@/utils/others";

interface UserI {
  banner: File | string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  age: number;
  description: string;
  jobRole: string;
  jobDescription: string;
  freelance: string;
  isAvailable: string;
}

function ManageUser() {
  const user = useAuthStore((state) => state.user);
  const formik = useFormik<UserI>({
    initialValues: {
      banner: "",
      fullname: user?.fullname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      age: user?.age || 0,
      description: user?.description || "",
      jobRole: user?.jobRole || "",
      jobDescription: user?.jobDescription || "",
      freelance: user?.freelance.toString() || "",
      isAvailable: user?.isAvailable.toString() || "",
    },
    onSubmit: handleSubmit,
  });
  const { isSubmitting, isValid } = formik;

  function handleSubmit(formValues: UserI) {
    const formData = new FormData();

    if (formValues.banner) formData.append("banner", formValues.banner);
    if (formValues.fullname) formData.append("fullname", formValues.fullname);
    if (formValues.email) formData.append("email", formValues.email);
    if (formValues.age) formData.append("age", formValues.age.toString());
    if (formValues.address) formData.append("address", formValues.address);
    if (formValues.phone) formData.append("phone", formValues.phone);
    if (formValues.description)
      formData.append("description", formValues.description);
    if (formValues.jobDescription)
      formData.append("jobDescription", formValues.jobDescription);
    if (formValues.jobRole) formData.append("jobRole", formValues.jobRole);
    if (formValues.freelance)
      formData.append("freelance", formValues.freelance.toString());
    if (formValues.isAvailable)
      formData.append("isAvailable", formValues.isAvailable.toString());

    axios
      .put("/api/user/", formData)
      .then((res) => reqSuccessAlertDisplayer(res))
      .catch((err) => reqErrorAlertDisplayer(err))
      .finally(() => console.log("Finito"));
  }
  return (
    <div className="manage-articles">
      <FormikProvider value={formik}>
        <Form>
          {userInfosFields.map((item, i) => (
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

export default ManageUser;
