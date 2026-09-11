import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Lock, Mail, User } from "lucide-react";

function SignupPage() {
  // Hold what the user types
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Holds an error message to show the user (empty = no error)
  const [error, setError] = useState("");

  // Used to redirect after a successful signup
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // stop the page from refreshing

    // Check that both passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Clear any previous error
    setError("");

    // For now, just log the values. Replace this with a real signup later.
    console.log("Full name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);

    // Send the user to the dashboard after signup
    navigate("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-gray-900 text-base font-bold text-white">
              B
            </div>
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-center text-2xl font-semibold text-gray-900">
            Create your account
          </h1>
          <p className="mt-1 text-center text-sm text-gray-500">
            Get started with Blaq Studio
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Full name input */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-900/5"
                />
              </div>
            </div>

            {/* Email input */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-900/5"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-900/5"
                />
              </div>
            </div>

            {/* Confirm password input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-900/5"
                />
              </div>
            </div>

            {/* Error message (only shows when there is one) */}
            {error && (
              <p className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700">
                {error}
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="h-10 w-full rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Create account
            </button>
          </form>

          {/* Bottom link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-gray-900 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
