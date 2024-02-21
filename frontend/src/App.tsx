import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { DefaultTheme } from "styled-components";
import { getLocalStorage } from "./utils/StorageHelper";
import { ReactNode } from "react";

function App() {
  const { colors } = useSelector((state: RootState) => state.colors);
  const { user } = useSelector((state: RootState) => state.auth);

  // Global theme name space for dashboard styles
  let theme: DefaultTheme = {
    colors: colors,
  };

  interface ProtectRouteProps {
    isAllowed?: boolean;
    redirectPath: string;
    children?: ReactNode;
  }

  const ProtectLoginRoute = ({
    isAllowed,
    redirectPath,
    children,
  }: ProtectRouteProps) => {
    let token = user?.token;
    const isAuthTokenValid = isAllowed ? true : token ? false : true;

    return isAuthTokenValid ? (
      <>{children ? children : <Outlet />}</>
    ) : (
      <Navigate to={redirectPath} replace />
    );
  };

  const ProtectedRoute = ({
    isAllowed,
    redirectPath,
    children,
  }: ProtectRouteProps) => {
    // const backTrackRoute = getLocalStorage("backTrackRoute");

    let token = user?.token;
    const isAuthTokenValid = isAllowed || token ? true : false;
    const routePath = redirectPath;
    return isAuthTokenValid ? (
      <>{children ? children : <Outlet />}</>
    ) : (
      <Navigate to={routePath} replace />
    );
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <div className="App">
            <Routes>
              <Route path="*" element={<Navigate to={'/login'} replace/>} />
              <Route
                path="/"
                element={
                  // <ProtectedRoute redirectPath="/login">
                  <Dashboard />
                // </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectLoginRoute redirectPath="/">
                    <Login />
                  </ProtectLoginRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectLoginRoute redirectPath="/">
                    <Register />
                  </ProtectLoginRoute>
                }
              />
            </Routes>
          </div>
        </Router>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          toastStyle={{
            color: theme.colors.primaryTextColor,
            backgroundColor: theme.colors.backgroundColor,
          }}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
