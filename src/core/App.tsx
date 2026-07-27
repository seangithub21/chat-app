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
import {
  useMediaQuery,
  createTheme,
  PaletteMode,
  ThemeProvider,
  CssBaseline,
  LinearProgress,
  useTheme,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "configs/firebase";
import baseTheme, { darkMode } from "configs/theme";
import { publicPaths, privatePaths } from "configs/routePaths";
import { setUser } from "features/auth/authSlice";
import { useAppDispatch } from "hooks/reduxHooks";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const RegisterPage = lazy(() => import("pages/RegisterPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));

interface ColorModeContextType {
  toggleColorMode?: () => void;
}

const publicRoutes = [
  { path: publicPaths.register, Component: <RegisterPage /> },
  { path: publicPaths.login, Component: <LoginPage /> },
];

const privateRoutes = [
  {
    path: privatePaths.chats,
    Component: <ProtectedRoute />,
  },
];

export const ColorModeContext = createContext<ColorModeContextType | null>(
  null,
);

const App = (): JSX.Element => {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
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
          ...baseTheme.typography,
          fontSize: isTablet ? baseTheme.typography.fontSize : 14,
        },
        components: {
          ...baseTheme.components,
          MuiCssBaseline: {
            styleOverrides: {
              html: {
                ...baseTheme.components.MuiCssBaseline.styleOverrides.html,
                "& #root": {
                  padding: isMobile ? "0" : "2rem",
                  backgroundImage:
                    "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
                },
              },
            },
          },
        },
      }),
    [themeMode, isMobile, isTablet],
  );

  // Subscribe to user's Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(setUser(null));
      } else {
        navigate(privatePaths.chats);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                element={route.Component}
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
