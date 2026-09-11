import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Mail } from "lucide-react";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // For now, just log the email. Replace with a real API call later.
    console.log("Send reset link to:", email);

    // Show the success message
    setSent(true);
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

          {/* If email has NOT been sent, show the form */}
          {!sent ? (
            <>
              <h1 className="mt-5 text-center text-2xl font-semibold text-gray-900">
                Forgot password?
              </h1>
              <p className="mt-1 text-center text-sm text-gray-500">
                Enter your email and we'll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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

                <button
                  type="submit"
                  className="h-10 w-full rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Send reset link
                </button>
              </form>
            </>
          ) : (
            /* If email HAS been sent, show the success message */
            <>
              <h1 className="mt-5 text-center text-2xl font-semibold text-gray-900">
                Check your email
              </h1>
              <p className="mt-1 text-center text-sm text-gray-500">
                We sent a password reset link to{" "}
                <span className="font-medium text-gray-900">{email}</span>.
              </p>

              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 h-10 w-full rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Use a different email
              </button>
            </>
          )}

          {/* Back to login */}
          <div className="mt-6 flex justify-center">
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
