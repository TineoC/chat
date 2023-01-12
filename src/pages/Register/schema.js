import * as yup from "yup";

const schema = yup.object().shape({
  document: yup.string(),
  names: yup.string(),
  surnames: yup.string(),
  email: yup.string().email(),
  confirmEmail: yup.string().oneOf([yup.ref("email"), null]),
  password: yup.string().min(8).max(25),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], `Password don't match`),
});

export default schema;
