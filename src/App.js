import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import SearchPage from "./scenes/searchPage";
import { useMemo } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import ApplicationPage from "./scenes/applicationPage";
import ApplicationsPage from "./scenes/applicationsPage";
import OffersPage from "./scenes/offersPage";
import RecievedApplicationsPage from "./scenes/recievedApplications";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  // const isCompany = Boolean(useSelector((state) => state.user.role));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/search/:searchQuery"
              element={isAuth ? <SearchPage /> : <Navigate to="/" />}
            />
            <Route
              path="/apply/:offerId"
              element={isAuth ? <ApplicationPage /> : <Navigate to="/" />}
            />
            <Route
              path="/offers"
              element={isAuth ? <OffersPage /> : <Navigate to="/" />}
            />
            <Route
              path="/applications"
              element={isAuth ? <ApplicationsPage /> : <Navigate to="/" />}
            />
            <Route
              path="/receivedApplications/:companyId"
              element={
                isAuth ? <RecievedApplicationsPage /> : <Navigate to="/" />
              }
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
