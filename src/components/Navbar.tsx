import { NavLink, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Button from "./ui/Button";

const Navbar = () => {
  const { pathname } = useLocation();

  const storageKey = "loggedUser";
  const loggedUser = Cookies.get(storageKey);
  const userData = loggedUser ? JSON.parse(loggedUser as string) : null;

  const handleLogOut = () => {
    toast.success("Cookies Removed Successfully", {
      duration: 1500,
      position: "bottom-center",
      style: {
        backgroundColor: "black",
        color: "#fff",
        width: "fit-content",
      },
    });

    Cookies.remove(storageKey);
    setTimeout(() => {
      location.replace(pathname);
    }, 1500);
  };

  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 px-3 py-5">
      <ul className="flex items-center justify-between">
        <li className="duration-200 text-lg">
          <NavLink to="/">Home</NavLink>
        </li>

        {userData ? (
          <div className="flex items-center space-x-2">
            <li className="duration-200 text-lg">
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <Button variant={"default"} onClick={handleLogOut}>
              LogOut
            </Button>
          </div>
        ) : (
          <p className="flex items-center space-x-3">
            <li className="duration-200 font-semibold text-lg">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="duration-200 font-semibold text-lg">
              <NavLink to="/login">Login</NavLink>
            </li>
          </p>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
