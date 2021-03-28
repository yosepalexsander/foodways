import { Fragment, useState } from "react";
import { useField } from "formik";
import CustomTextField from "./CustomTextField";
import "./styles.css";

const FormikInput = ({ inputProps, children, ...props }) => {
  const [field, meta] = useField(props);
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback = (!!didFocus && field.value.trim().length > 2) || meta.touched;

  return (
    <Fragment>
      <CustomTextField
        {...props}
        className={showFeedback ? (meta.error ? "invalid" : "valid") : ''}
        {...field}
        color="secondary"
        onFocus={handleFocus}
        helperText={meta.error}
        error={Boolean(meta.error)}
        InputProps={inputProps}
      >
        {children}
      </CustomTextField>
    </Fragment>
  )
}

export default FormikInput;
