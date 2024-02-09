import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { IErrorResponse, LoginFormInterface } from "../interfaces";
import { LOGIN_FORM } from "../data";
import axiosInstance from "../config/axios.config";
import { loginSchema } from "../validation";
import Cookies from "js-cookie";
import { useState } from "react";
import { AxiosError } from "axios";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInterface>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInterface> = async (data) => {
    console.log(data);
    setIsLoading(true);

    try {
      const { status, data: resData } = await axiosInstance.post(
        "/auth/local",
        data
      );

      if (status === 200) {
        toast.success("You Will Navigate to the home page in 2 seconds!", {
          duration: 1500,
          position: "bottom-center",
          style: {
            backgroundColor: "black",
            color: "#fff",
            width: "fit-content",
          },
        });

        Cookies.set("loggedUser", JSON.stringify(resData), {
          expires: 7,
          secure: true,
        });

        setTimeout(() => {
          location.replace("/");
        }, 2000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;

      toast.error(`${errorObj?.response?.data?.error.message}`, {
        duration: 1500,
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginForm = LOGIN_FORM.map(
    ({ name, placeholder, type }, index) => (
      <div key={index}>
        <Input type={type} {...register(name)} placeholder={placeholder} />

        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    )
  );

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {renderLoginForm}
        <Button isLoading={isLoading} fullWidth>
          Login
        </Button>
        <div className="flex justify-center gap-2">
          <p>No account?</p>
          <Link className="text-indigo-600 underline" to={"/register"}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
