import { Articles } from "@prisma/client";
import { ReactElement } from "react";

export type allPageTitleAndSubtitleType = {
  title: string;
  subTitle: string;
};

export type contactInfosType = {
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  tel: string;
  available: boolean;
  address: string;
};

export type ArticleWithAutorAndBanner = Articles<{
  include: {
    autor: true;
    banner: true;
  };
}>;

export type UserType = {
  id: string;
  fullname: string;
  age: number;
  email: string;
  phone: string;
  address: string;
};

export type ComponentWithChildType = {
  children: ReactElement;
};
