import {
  addressField,
  ageField,
  articleBanner,
  articleContent,
  articleTitle,
  emailField,
  fullnameField,
  passwordField,
  phoneField,
  userBannerField,
} from "./fields";

export const loginFields = [emailField, passwordField];

export const articleFields = [articleTitle, articleBanner, articleContent];

export const userInfosFields = [
  userBannerField,
  fullnameField,
  emailField,
  ageField,
  phoneField,
  addressField,
];
