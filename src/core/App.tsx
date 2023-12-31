import { JSX, useState, useMemo, createContext, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  useMediaQuery,
  createTheme,
  PaletteMode,
  ThemeProvider,
  CssBaseline,
  LinearProgress,
} from "@mui/material";

import { publicPaths, privatePaths } from "configs/routePaths";
import baseTheme, { darkMode, mobile } from "configs/theme";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

const SignUpPage = lazy(() => import("pages/SignUpPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));
const ChatsPage = lazy(() => import("pages/ChatsPage"));
const ContactsPage = lazy(() => import("pages/ContactsPage"));

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
    Component: <ChatsPage />,
  },
  {
    path: privatePaths.contacts,
    Component: <ContactsPage />,
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
