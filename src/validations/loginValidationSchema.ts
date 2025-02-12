
import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
    name: Yup.string().min(2, "Too short!").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
});