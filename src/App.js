import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import EventsListPage from "./pages/EventsListPage";
import EventDetailPage from "./pages/EventDetailPage";
import ApplicationStatusPage from "./pages/ApplicationStatusPage";
import MyEventsPage from "./pages/MyEventsPage";
import MyEventFormPage from "./pages/MyEventFormPage";
import { useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <Navigation />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<EventsListPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/applications" element={<ApplicationStatusPage />} />
        {/* 내 행사 관리 라우트 */}
        <Route path="/my-events" element={<MyEventsPage />} />
        <Route path="/my-events/new" element={<MyEventFormPage />} />
        <Route path="/my-events/:id/edit" element={<MyEventFormPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
