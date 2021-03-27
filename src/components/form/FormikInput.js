import { Fragment, useState } from "react";
import { useField } from "formik";
import CustomTextField from "./CustomTextField";
import "./styles.css";

const FormikInput = ({ inputProps, ...props }) => {
  const [field, meta] = useField(props);
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback = (!!didFocus && field.value.trim().length > 2) || meta.touched;


  return (
    <Fragment>
      <CustomTextField
        id={props.id}
        className={showFeedback ? (meta.error ? "invalid" : "valid") : ''}
        {...field}
        onFocus={handleFocus}
        helperText={meta.error}
        error={Boolean(meta.error)}
        InputProps={inputProps}
      />
    </Fragment>
  )
}

export default FormikInput;
