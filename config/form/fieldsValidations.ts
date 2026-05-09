import { object, string, number, date, mixed, array, InferType } from "yup";

const userSchema = object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
  website: string().url().nullable(),
  createdOn: date().default(() => new Date()),
});

const workSchema = object({
  title: string().required(),
  link: string().url().required(),
  description: string().required(),
});

export const SkillSchema = object({
  name: string().required("Name is required"),
  icon: string().required("Icon is required"),
});

export const WorkAddSchema = object({
  title: string().required(),
  link: string().url().required(),
  description: string().required(),
  banner: mixed().required(),
  technologies: array().required(),
});

export const WorkUpSchema = object({
  title: string().required(),
  link: string().url().required(),
  description: string().required(),
  banner: mixed().notRequired(),
  technologies: array().required(),
});

export const ArticleAddSchema = object({
  title: string().required(),
  content: string().required(),
  description: string().required(),
  media: mixed().required(),
});

export const ArticleUpSchema = object({
  title: string().required(),
  content: string().required(),
  description: string().required(),
  media: mixed().notRequired(),
});
