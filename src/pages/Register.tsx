import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { IErrorResponse, RegisterFormInterface } from "../interfaces";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import axiosInstance from "../config/axios.config";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInterface>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInterface> = async (data) => {
    console.log(data);
    setIsLoading(true);

    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status === 200) {
        toast.success("You will navigate to login page in 2 seconds to login", {
          duration: 1500,
          position: "bottom-center",
          style: {
            backgroundColor: "black",
            color: "#fff",
            width: "fit-content",
          },
        });

        setTimeout(() => {
          navigate("/login");
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

  const renderRegisterForm = REGISTER_FORM.map(
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
        Register to get access!
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {renderRegisterForm}

        <Button isLoading={isLoading} fullWidth>
          Register
        </Button>
        <div className="flex justify-center gap-2">
          <p>have an account?</p>
          <Link className="text-indigo-600 underline" to={"/login"}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
