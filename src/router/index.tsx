import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";
import RootLayout from "../pages/Layout";
import ErrorHandler from "../components/errors/ErrorHandler";
import HomePage from "../pages";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";
import Cookies from "js-cookie";

interface IUserData {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

const loggedUser = Cookies.get("loggedUser");

const userData: IUserData = loggedUser
  ? JSON.parse(loggedUser as string)
  : null;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={!!userData?.jwt}
              redirectPath="/login"
              data={userData}
            >
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute
              isAllowed={!!userData?.jwt}
              redirectPath="/login"
              data={userData}
            >
              <p className="text-center">
                Profile Page
                <br />
                <br />
                <strong>Username:</strong> {userData?.user?.username}
                <br />
                <strong>Email:</strong> {userData?.user?.email}
              </p>
            </ProtectedRoute>
          }
        />

        <Route
          path="login"
          element={
            <ProtectedRoute
              isAllowed={!userData?.jwt}
              redirectPath="/"
              data={userData}
            >
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute
              isAllowed={!userData?.jwt}
              redirectPath="/login"
              data={userData}
            >
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
