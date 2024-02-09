export interface RegisterFormInterface {
  username: string;
  email: string;
  password: string;
}

export interface LoginFormInterface {
  identifier: string;
  password: string;
}

export interface IRegisterInput {
  name: "username" | "email" | "password";
  type: string;
  placeholder: string;
}

export interface ILoginInput {
  name: "identifier" | "password";
  type: string;
  placeholder: string;
}

export interface IErrorResponse {
  error: {
    // details?: {
    //   errors: {
    //     message: string;
    //   }[];
    // };
    message?: string;
  };
}
