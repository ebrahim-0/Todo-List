import { object, string } from "yup";

export const registerSchema = object({
  username: string()
    .required("Username is required")
    .min(3, "Username Should be at-least 3 characters"),
  email: string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    ),
  password: string()
    .min(8, "Password should be at least 8 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password should contain at least one letter and one number"
    ),
});

export const loginSchema = object({
  identifier: string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    ),
  password: string()
    .min(8, "Password should be at least 8 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password should contain at least one letter and one number"
    ),
});
