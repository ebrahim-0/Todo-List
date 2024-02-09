import { ILoginInput, IRegisterInput } from "../interfaces";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    name: "username",
    type: "text",
    placeholder: "Username",
  },

  {
    name: "email",
    type: "email",
    placeholder: "Email address",
  },

  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];

export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "identifier",
    type: "email",
    placeholder: "Email address",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];
