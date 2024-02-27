import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { DefaultTheme } from 'styled-components';
// import { getLocalStorage } from "./utils/StorageHelper";
import { ReactNode, useEffect } from 'react';
import { checkServer } from './features/auth/authSlice';
import ServerCheckLoading from './components/ServerCheckLoading';

function App() {
  const { colors } = useSelector((state: RootState) => state.colors);

  // Global theme name space for dashboard styles
  let theme: DefaultTheme = {
    colors: colors,
  };

  interface ProtectRouteProps {
    isAllowed?: boolean;
    redirectPath: string;
    children?: ReactNode;
    isCommon?: boolean;
  }

  const ProtectRoute = ({
    isAllowed,
    redirectPath,
    children,
    isCommon = true,
  }: ProtectRouteProps) => {
    const dispatch = useDispatch();
    const { checkServerLoading, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
      dispatch(checkServer());
    }, [dispatch]);

    if (checkServerLoading) {
      return <ServerCheckLoading />;
    } else {
      let token = user?.token;
      const isAuthTokenValid = isAllowed ? true : isCommon ? token : !token;

      return isAuthTokenValid ? (
        <>{children ? children : <Outlet />}</>
      ) : (
        <Navigate to={redirectPath} replace />
      );
    }
  };

  // const ProtectedRoute = ({
  //   isAllowed,
  //   redirectPath,
  //   children,
  // }: ProtectRouteProps) => {
  //   const { user } = useSelector((state: RootState) => state.auth);
  //   // const backTrackRoute = getLocalStorage("backTrackRoute");
  //   let token = user?.token;
  //   const isAuthTokenValid = isAllowed || token ? true : false;
  //   const routePath = redirectPath;
  //   return isAuthTokenValid ? (
  //     <>{children ? children : <Outlet />}</>
  //   ) : (
  //     <Navigate to={routePath} replace />
  //   );
  // };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <div className="App">
            <Routes>
              <Route path="*" element={<Navigate to={'/login'} replace />} />
              <Route
                path="/"
                element={
                  // <ProtectRoute redirectPath="/login">
                  <Dashboard />
                  // </ProtectRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectRoute isCommon={false} redirectPath="/">
                    <Login />
                  </ProtectRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectRoute isCommon={false} redirectPath="/">
                    <Register />
                  </ProtectRoute>
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
