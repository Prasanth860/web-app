import { useState } from "react";
let isSubmitted = false;
let newErrors = {};
let hasErrors = false;
export const useFormValidation = (metadata) => {
  const [data, setData] = useState(metadata.initialValues || {});
  const [errors, setErrors] = useState({});

  const handleChange = (name) => (e) => {
    e.preventDefault();
    if (name) {
      let str = e.target.value.replace(/(^\s*)|(\s*$)/, "").replace(/[ ]{2,}/gi, " ").replace(/\n +/, "\n");
      setData({
        ...data,
        [name]: str,
      });

      submittingData(name, str);
    }
  };

  const handleDataChange = (name, value) => {
    if (name) {
      setData({
        ...data,
        [name]: value,
      });
      submittingData(name, value);
    }
  };



  const setV = (v) => {
    setData(v);
  };

  const addObject = (u) => {
    setData({
      ...data,
      ...u
    })
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    isSubmitted = true;
    validateForm();
    if (!hasErrors) {
      metadata.submit();
    }
  };

  const validateForm = () => {
    for (const key in metadata.validationSchema) {
      validateFormControl(key, data?.[key]);
    }
    setErrors(newErrors);
    var size = Object.keys(newErrors).length;
    if (size) {
      hasErrors = true;
    } else {
      hasErrors = false;
    }
    newErrors = {};
  };

  const submittingData = (name, value) => {
    if (isSubmitted) {
      validateFormControl(name, value);

      if (errors && errors[name] && !newErrors[name]) {
        setErrors({
          ...errors,
          [name]: "",
        });
      } else {
        setErrors({
          ...errors,
          ...newErrors,
        });
      }
      newErrors = {};
    }
  };

  const validateFormControl = (key, value) => {
    const schema = metadata.validationSchema;
    const validationFormControl = schema?.[key];
    if (validationFormControl?.required && !value) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.required?.message,
      };
    } else if (
      validationFormControl?.minlength &&
      value.length < validationFormControl?.minlength?.value
    ) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.minlength?.message,
      };
    } else if (
      validationFormControl?.maxlength &&
      value.length > validationFormControl?.maxlength?.value
    ) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.maxlength?.message,
      };
    } else if (
      validationFormControl?.pattern &&
      !validationFormControl.pattern?.value?.test(value)
    ) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.pattern?.message,
      };
    }
  };

  return {
    data,
    setV,
    errors,
    isSubmitted,
    addObject,
    handleChange,
    handleSubmit,
    // setValues,
    handleDataChange
  };
};
