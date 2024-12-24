"use client";
import axios from "axios";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { FormButton } from "@/uikits/buttons";
import FormFieldProvider from "@/uikits/form";
import { userInfosFields } from "@/config/form/fieldsArray";
import useAuth from "@/hooks/useAuth";
import useAuthStore from "@/stores/auth";

interface UserI {
  banner: File | "";
  fullname: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  age: number | undefined;
}
function ManageUser() {
  useAuth();
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);

  const formik = useFormik<UserI>({
    initialValues: {
      banner: "",
      fullname: user?.fullname,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      age: user?.age,
    },
    onSubmit: handleSubmit,
  });
  const { isSubmitting, isValid } = formik;

  function handleSubmit(formValues: UserI) {
    const formData = new FormData();
    formData.append("banner", formValues.banner);
    formData.append("fullname", formValues.fullname);
    formData.append("email", formValues.email);
    formData.append("age", formValues.age);
    formData.append("address", formValues.address);
    formData.append("phone", formValues.phone);

    axios
      .put("/api/user/", formData)
      .then((res) => updateUser(res.data))
      .catch((err) => console.log(err))
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
