import { useField } from "formik";
import { FormikErrorMessage } from ".";
import SunEditor from "suneditor-react";
import plugins from "suneditor/src/plugins";

export function FormikWYSIWGInput(props) {
  const { name, label } = props;
  const [field, meta, helpers] = useField(name);
  const { value } = meta;

  return (
    <div className="formFieldW flex f-column">
      <label>{label}</label>

      <section>
        <SunEditor
          defaultValue={value}
          plugins={plugins}
          name={name}
          width="100%"
          height="auto"
          onChange={(content) => helpers.setValue(content)}
          setOptions={{
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize", "formatBlock"],
              ["paragraphStyle", "blockquote"],
              ["bold", "underline", "italic"],
              ["removeFormat"],
              ["outdent", "indent"],
              ["align", "horizontalRule", "list", "lineHeight"],

              ["fullScreen", "showBlocks"],
              ["preview"],
              ["save"],
            ],
          }}
        />
      </section>
      <FormikErrorMessage name={name} />
    </div>
  );
}
