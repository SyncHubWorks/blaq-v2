import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

// import HomePage from "./pages/HomePage";
import AboutPage from "./pages/unathorized/AboutPage";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import LandingPage from "./pages/unathorized/LandingPage";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

function App() {
  const { checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          index
          element={!user ? <LandingPage /> : <Navigate to="/dashboard" />}
        />
        <Route path="/about" element={<AboutPage />} />

        {/* AUTH ROUTES */}
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/forgot-password"
          element={!user ? <ForgotPasswordPage /> : <Navigate to="/" />}
        />
        <Route
          path="/reset-password"
          element={!user ? <ResetPasswordPage /> : <Navigate to="/" />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/onboarding"
          element={user ? <OnboardingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* FALLBACK ROUTES */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />

      <Toaster />
    </>
  );
}

export default App;
