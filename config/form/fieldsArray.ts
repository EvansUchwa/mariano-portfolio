import {
  addressField,
  ageField,
  articleBanner,
  articleContent,
  articleDesc,
  articleTitle,
  emailField,
  fullnameField,
  passwordField,
  phoneField,
  userBannerField,
  workBanner,
  workDesc,
  workLink,
  workTitle,
} from "./fields";

export const loginFields = [emailField, passwordField];

export const articleFields = [
  articleTitle,
  articleBanner,
  articleDesc,
  articleContent,
];

export const workFields = [workTitle, workBanner, workLink, workDesc];

export const userInfosFields = [
  userBannerField,
  fullnameField,
  emailField,
  ageField,
  phoneField,
  addressField,
];
