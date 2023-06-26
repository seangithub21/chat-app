import { JSX, useState, useMemo, createContext, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  useMediaQuery,
  createTheme,
  PaletteMode,
  ThemeProvider,
  CssBaseline,
  LinearProgress,
} from "@mui/material";

import baseTheme, { darkMode, mobile } from "configs/theme";
import { publicPaths, privatePaths } from "configs/routePaths";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

const LoginPage = lazy(() => import("pages/LoginPage"));

interface ColorModeContextType {
  toggleColorMode: () => void;
}

const publicRoutes = [{ path: publicPaths.login, Component: <LoginPage /> }];

const privateRoutes = [
  { path: privatePaths.messages, Component: <div>Messages</div> },
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
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
