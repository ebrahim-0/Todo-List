import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import { RegisterFormInterface } from "../interfaces";
import InputController from "./../components/ui/InputController";

const RegisterWithController = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInterface>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInterface> = (data) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputController<RegisterFormInterface>
          type="text"
          control={control}
          name="username"
          placeholder="Username"
          rules={{
            required: "Username is Required",
            minLength: {
              value: 5,
              message: "Username Should be at-least 5 characters",
            },
          }}
        />
        <InputController<RegisterFormInterface>
          type="email"
          control={control}
          name="email"
          placeholder="Email address"
          rules={{
            required: "Email is Required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
        />
        <InputController<RegisterFormInterface>
          type="password"
          control={control}
          name="password"
          placeholder="Password"
          rules={{
            required: "Password is Required",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                "Minimum 8 characters, at least one letter and one number",
            },
          }}
        />

        <Button fullWidth>Register</Button>
      </form>
    </div>
  );
};

export default RegisterWithController;
