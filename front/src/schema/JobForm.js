import * as yup from "yup";

export const jobSchema = yup.object().shape({
  image: yup.string().required("not found"),
  title: yup.string().required("not found"),
});
