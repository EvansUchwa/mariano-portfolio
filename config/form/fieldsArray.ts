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
} from "./fields";

export const loginFields = [emailField, passwordField];

export const articleFields = [
  articleTitle,
  articleBanner,
  articleDesc,
  articleContent,
];

export const userInfosFields = [
  userBannerField,
  fullnameField,
  emailField,
  ageField,
  phoneField,
  addressField,
];
