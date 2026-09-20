import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import AboutPage from "./pages/unathorized/AboutPage";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

import LandingPage from "./pages/unathorized/LandingPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { checkAuth, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = Boolean(user);
  const isAdmin = user?.role === "admin";

  // Admins don't need onboarding.
  const needsOnboarding = isAuthenticated && !isAdmin && !user?.onBoarded;

  return (
    <>
      <Navbar />

      <Routes>
        {/* ==================== PUBLIC ==================== */}

        <Route
          index
          element={
            !isAuthenticated ? (
              <LandingPage />
            ) : needsOnboarding ? (
              <Navigate to="/onboarding" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route path="/about" element={<AboutPage />} />

        {/* ==================== AUTH ==================== */}

        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : needsOnboarding ? (
              <Navigate to="/onboarding" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="/forgot-password"
          element={
            !isAuthenticated ? (
              <ForgotPasswordPage />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="/reset-password"
          element={
            !isAuthenticated ? (
              <ResetPasswordPage />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* ==================== ONBOARDING ==================== */}

        <Route
          path="/onboarding"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : isAdmin ? (
              <Navigate to="/dashboard" replace />
            ) : user?.onBoarded ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <OnboardingPage />
            )
          }
        />

        {/* ==================== PROTECTED ==================== */}

        <Route
          path="/dashboard"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : needsOnboarding ? (
              <Navigate to="/onboarding" replace />
            ) : (
              <Dashboard />
            )
          }
        />

        {/* ==================== FALLBACK ==================== */}

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer />

      <Toaster />
    </>
  );
}

export default App;
