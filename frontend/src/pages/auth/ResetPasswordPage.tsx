import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Lock } from "lucide-react";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Check that both passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Clear any previous error
    setError("");

    // For now, just log. Replace with a real API call later.
    console.log("New password set to:", password);

    // Send them back to login after resetting
    navigate("/login");
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
            Set a new password
          </h1>
          <p className="mt-1 text-center text-sm text-gray-500">
            Choose a strong password you'll remember.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* New password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                New password
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

            {/* Confirm new password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Confirm new password
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

            {/* Error message */}
            {error && (
              <p className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="h-10 w-full rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Reset password
            </button>
          </form>

          {/* Back to login */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Remembered it?{" "}
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

export default ResetPasswordPage;
