export type FormFieldProviderType = {
  name: string;
  fieldType: string;
  ph?: string;
  label: string;
  options?: [];
  valueKey?: string;
  labelKey?: string;
};
export type SharedTextFieldType = {
  name: string;
  fieldType: string;
  ph?: string;
  label?: string;
  min?: string;
  max?: string;
};

export type FileFieldType = {
  name: string;
  fieldType: string;
  ph?: string;
  label: string;
  accept: string;
};

export type RadioFieldType = {
  name: string;
  fieldType: string;
  label: string;
  options: [];
  valueKey: string;
  labelKey: string;
};

export type SelectFieldType = RadioFieldType & {
  chooseLabelKey: string;
};
