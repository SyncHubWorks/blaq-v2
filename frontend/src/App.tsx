import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* PROTECTED ROUTES */}

        {/* FALLBACK ROUTES */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
