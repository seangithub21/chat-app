import { JSX, useState, useMemo, createContext, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  useMediaQuery,
  createTheme,
  PaletteMode,
  ThemeProvider,
  CssBaseline,
  LinearProgress,
  useTheme,
} from "@mui/material";

import { publicPaths, privatePaths } from "configs/routePaths";
import baseTheme, { darkMode, mobile } from "configs/theme";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

const SignUpPage = lazy(() => import("pages/SignUpPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));

interface ColorModeContextType {
  toggleColorMode?: () => void;
}

const publicRoutes = [
  { path: publicPaths.signup, Component: <SignUpPage /> },
  { path: publicPaths.login, Component: <LoginPage /> },
];

const privateRoutes = [
  {
    path: privatePaths.chats,
    Component: <ProtectedRoute />,
  },
  {
    path: "*",
    Component: <Navigate to={privatePaths.chats} replace />,
  },
];

export const ColorModeContext = createContext<ColorModeContextType | null>(
  null
);

const App = (): JSX.Element => {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

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
        components: {
          ...baseTheme.components,
          MuiCssBaseline: {
            styleOverrides: {
              html: {
                ...baseTheme.components.MuiCssBaseline.styleOverrides.html,
                "& #root": {
                  padding: isMobile ? "0" : "2rem",
                },
              },
            },
          },
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
