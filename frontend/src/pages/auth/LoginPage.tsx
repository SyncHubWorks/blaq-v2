import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Lock, Mail } from "lucide-react";

function LoginPage() {
  // Hold what the user types
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Used to redirect after a successful login
  const navigate = useNavigate();

  // Runs when the form is submitted
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // stop the page from refreshing

    // For now, just log the values. Replace this with real login later.
    console.log("Email:", email);
    console.log("Password:", password);

    // Send the user to the dashboard after login
    navigate("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
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
            Welcome back
          </h1>
          <p className="mt-1 text-center text-sm text-gray-500">
            Sign in to your Blaq Studio account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-gray-500 hover:text-gray-900"
                >
                  Forgot password?
                </Link>
              </div>
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

            {/* Submit button */}
            <button
              type="submit"
              className="h-10 w-full rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Sign in
            </button>
          </form>

          {/* Bottom link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-gray-900 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
