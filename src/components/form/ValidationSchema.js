import * as Yup from "yup";

export const RegisterSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .max(50, 'Must be less than 50 characters')
    .matches(/^[A-Za-z0-9]+$/, { message: "Cannot contain special characters or spaces" })
    .required('Password is required'),
  fullName: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .max(40, 'Must be less than 40 characters')
    .required('Fullname is required'),
  gender: Yup.string()
    .matches(/^(Male|male|Female|female)$/, "Gender must be male or female")
    .required('Gender is required'),
  phone: Yup.string()
    .min(11, 'Must be at least 11 characters')
    .max(12, 'Must be less than 12 characters')
    .required('Phone is required'),
  role: Yup.string().required('Role is required')
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required(),
  password: Yup.string().required('Required!!')
});

