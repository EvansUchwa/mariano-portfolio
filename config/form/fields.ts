const yerOrNoOptions = [
  { value: "true", label: "Oui" },
  { value: "false", label: "Non" },
];

const fakeSkillExempleOptions = [
  { value: "true", label: "Docker" },
  { value: "false", label: "Github" },
];
export const emailField = {
  fieldType: "email",
  label: "Votre email",
  ph: "abc@gmail.com",
  name: "email",
};
export const passwordField = {
  fieldType: "password",
  label: "Mot de passe",
  ph: "MonMotdePasse@1234",
  name: "password",
};
export const passwordConfirmationField = {
  fieldType: "password",
  label: "Confirmation de mot de passe",
  ph: "MonMotdePasse@1234",
  name: "passwordConfirmation",
};

export const userBannerField = {
  fieldType: "file",
  label: "La photo de banniere",
  name: "banner",
  accept: "image/*",
};

export const userResumeField = {
  fieldType: "file",
  label: "Votre Cv",
  name: "resume",
  accept: "image/*",
};

export const fullnameField = {
  fieldType: "text",
  label: "Votre nom/prenom",
  ph: "Jean Du Jardin",
  name: "fullname",
};

export const ageField = {
  fieldType: "number",
  label: "Votre age",
  ph: "12",
  name: "age",
};

export const phoneField = {
  fieldType: "text",
  label: "Votre telephone",
  ph: "+1......",
  name: "phone",
};

export const addressField = {
  fieldType: "text",
  label: "Votre adresse",
  ph: "Gotham City",
  name: "address",
};

export const userDescriptionField = {
  fieldType: "wysiwyg",
  label: "DUne petite description",
  name: "description",
};

export const userJobRoleField = {
  fieldType: "text",
  label: "Votre job",
  name: "jobRole",
};

export const userJobDescriptionField = {
  fieldType: "text",
  label: "La description de votre job",
  name: "jobDescription",
};

export const userIsAvailableField = {
  fieldType: "radio",
  label: "Disponible immediatement ?",
  name: "isAvailable",
  options: yerOrNoOptions,
  valueKey: "value",
  labelKey: "label",
};

export const userFreelanceField = {
  fieldType: "radio",
  label: "Disponible en Freelance ?",
  name: "freelance",
  options: yerOrNoOptions,
  valueKey: "value",
  labelKey: "label",
};

export const articleTitle = {
  fieldType: "text",
  label: "Titre de l'article",
  name: "title",
};

export const articleDesc = {
  fieldType: "textarea",
  label: "Description de l'article",
  name: "description",
};

export const articleBanner = {
  fieldType: "file",
  label: "Banniere de l'article",
  name: "media",
  accept: "image/*",
};

export const articleContent = {
  fieldType: "wysiwyg",
  label: "Contenu de l'article",
  name: "content",
};

export const mediaField = {
  fieldType: "file",
  label: "Le fichier",
  name: "media",
  accept: "image/*,video/*",
};

export const workTitle = {
  fieldType: "text",
  label: "Titre du projet",
  name: "title",
};

export const workLink = {
  fieldType: "text",
  label: "Lien du projet",
  name: "link",
};

export const workDesc = {
  fieldType: "textarea",
  label: "Description du projet",
  name: "description",
};

export const workBanner = {
  fieldType: "file",
  label: "Image du projet",
  name: "banner",
  accept: "image/*",
};

export const workSkillField = {
  fieldType: "checkbox",
  label: "Les competences sur ce projet",
  name: "technologies",
  // options: fakeSkillExempleOptions,
  valueKey: "id",
  labelKey: "name",
};

export const skillName = {
  fieldType: "text",
  label: "Nom de la competence",
  name: "name",
};

export const skillIcon = {
  fieldType: "text",
  label: "Icone de la competence(Url,voir les site : icone.js)",
  name: "icon",
};
