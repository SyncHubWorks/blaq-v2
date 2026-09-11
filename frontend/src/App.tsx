import { Route, Routes } from "react-router";
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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route index element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* AUTH ROUTES */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* PROTECTED ROUTES */}
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* FALLBACK ROUTES */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />

      <Toaster />
    </>
  );
}

export default App;
