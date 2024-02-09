import Button from "./ui/Button";
import axiosInstance from "../config/axios.config";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

interface TodoItem {
  id: number;
  title: string;
}

const TodoList = () => {
  const storageKey = "loggedUser";
  const loggedUser = Cookies.get(storageKey);
  const userData = loggedUser ? JSON.parse(loggedUser as string) : null;

  const getTodos = async () => {
    const res = await axiosInstance.get("/users/me", {
      params: {
        populate: "todos",
      },
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    });

    return res.data.todos;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isLoading)
    return (
      <div className="flex gap-3 justify-center items-center font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 animate-spin text-indigo-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        <h3>Fetching Todos...</h3>
      </div>
    );

  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }

  return (
    <div className="space-y-1 ">
      {data.length ? (
        data.map((todo: TodoItem, index: number) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">
              {index + 1} - {todo.title}
            </p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button size={"sm"}>Edit</Button>
              <Button variant={"danger"} size={"sm"}>
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No Todos Yet!</h3>
      )}
    </div>
  );
};

export default TodoList;
