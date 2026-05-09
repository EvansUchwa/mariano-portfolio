import { skillsFields } from "@/config/form/fieldsArray";
import { SkillSchema } from "@/config/form/fieldsValidations";
import useModalStore from "@/stores/modal";
import { FormButton } from "@/uikits/buttons";
import FormFieldProvider from "@/uikits/form";
import {
  reqErrorAlertDisplayer,
  reqSuccessAlertDisplayer,
} from "@/utils/others";
import { Skills } from "@prisma/client";
import axios from "axios";
import { Form, FormikProvider, useFormik } from "formik";

type AOUSkillProps = {
  skill?: Skills;
  refetchSkills: () => void;
};

type SkillsFormValues = {
  name: string;
  icon: string;
};
export function AOUSkill({ skill, refetchSkills }: AOUSkillProps) {
  const toggleModal = useModalStore((state) => state.toggle);
  const formik = useFormik({
    initialValues: {
      name: skill ? skill.name : "",
      icon: skill ? skill.icon : "",
    },
    onSubmit: handleSubmit,
    validateOnMount: true,
    validationSchema: SkillSchema,
  });

  const { isSubmitting, isValid } = formik;

  function handleSubmit(values: SkillsFormValues) {
    let reqMethod;
    let reqBody;

    if (skill) {
      reqMethod = axios.put;
      reqBody = { ...values, skillId: skill.id };
    } else {
      reqMethod = axios.post;
      reqBody = values;
    }

    reqMethod("/api/skill", reqBody)
      .then((res) => reqSuccessAlertDisplayer(res))
      .catch((err) => reqErrorAlertDisplayer(err))
      .finally(() => {
        formik.resetForm();
        toggleModal();
        refetchSkills();
      });
  }

  return (
    <FormikProvider value={formik}>
      <Form>
        {skillsFields.map((item, i) => (
          <FormFieldProvider {...item} key={"skill field nb" + i} />
        ))}
        <FormButton
          text="Enregistrer"
          isValid={isValid}
          isSubmitting={isSubmitting}
        />
      </Form>
    </FormikProvider>
  );
}

export function deleteSkill(
  skillId: string,
  toggleModal: () => void,
  refetchSkills: () => void
) {
  axios
    .delete("/api/skill?skillId=" + skillId)
    .then((res) => reqSuccessAlertDisplayer(res))
    .catch((err) => reqErrorAlertDisplayer(err))
    .finally(() => {
      toggleModal();
      refetchSkills();
    });
}
