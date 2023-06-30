import {
  JSX,
  useState,
  useMemo,
  createContext,
  Suspense,
  lazy,
  useEffect,
} from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  useMediaQuery,
  createTheme,
  PaletteMode,
  ThemeProvider,
  CssBaseline,
  LinearProgress,
} from "@mui/material";

import { setUser } from "features/auth/authSlice";
import { useAppDispatch } from "hooks/reduxHooks";
import { publicPaths, privatePaths } from "configs/routePaths";
import { auth } from "configs/firebase";
import baseTheme, { darkMode, mobile } from "configs/theme";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

const LoginPage = lazy(() => import("pages/LoginPage"));

interface ColorModeContextType {
  toggleColorMode?: () => void;
}

const publicRoutes = [{ path: publicPaths.login, Component: <LoginPage /> }];

const privateRoutes = [
  {
    path: privatePaths.messages,
    Component: <div>Messages</div>,
  },
  {
    path: "*",
    Component: <div>Page404</div>,
  },
];

export const ColorModeContext = createContext<ColorModeContextType | null>(
  null
);

const App = (): JSX.Element => {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");
  const isMobile = useMediaQuery("(max-width:600px)");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(JSON.parse(JSON.stringify(user))));
      } else {
        dispatch(setUser({}));
        localStorage.clear();
        navigate(publicPaths.login);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: {
          mode: themeMode,
          ...(themeMode === "light" ? baseTheme.palette : darkMode.palette),
        },
        typography: {
          ...(isMobile ? mobile.typography : baseTheme.typography),
        },
      }),
    [themeMode, isMobile]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<PublicRoute>{route.Component}</PublicRoute>}
              />
            ))}
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<ProtectedRoute>{route.Component}</ProtectedRoute>}
              />
            ))}
            <Route
              path="*"
              element={<Navigate to={publicPaths.login} replace />}
            />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
