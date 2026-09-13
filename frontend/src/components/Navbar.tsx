import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Bell, LogOut, Menu, Search, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const adminLinks = [
  { name: "Overview", path: "/admin" },
  { name: "Users", path: "/admin/users" },
  { name: "Approvals", path: "/admin/approvals" },
  { name: "Reports", path: "/admin/reports" },
  { name: "Settings", path: "/admin/settings" },
];

const businessLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Appointments", path: "/appointments" },
  { name: "Clients", path: "/clients" },
  { name: "Services", path: "/services" },
  { name: "Analytics", path: "/analytics" },
];

const userLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Bookings", path: "/bookings" },
  { name: "Messages", path: "/messages" },
  { name: "Saved", path: "/saved" },
];

const guestLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Pricing", path: "/pricing" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const links = !user
    ? guestLinks
    : user.role === "admin"
      ? adminLinks
      : user.role === "business"
        ? businessLinks
        : userLinks;

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gray-900 text-sm font-bold text-white">
            B
          </div>
          <span className="text-base font-semibold text-gray-900">
            Blaq Studio
          </span>
        </Link>

        {/* Desktop navigation (hidden on small screens) */}
        <nav className="ml-8 hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900"
                  : "rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search (only when logged in, md+) */}
          {user && (
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-48 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-900 outline-none focus:border-gray-300 focus:bg-white"
              />
            </div>
          )}

          {/* Logged-in: bell + avatar */}
          {user && (
            <>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <Bell className="h-5 w-5" />
              </button>

              {/* Avatar: show profile picture if we have one, otherwise initials */}
              <button
                type="button"
                title={user.fullName}
                className="hidden h-9 w-9 overflow-hidden rounded-full bg-gray-200 text-xs font-semibold text-gray-700 sm:grid sm:place-items-center"
              >
                {user.profilePic?.secure_url ? (
                  <img
                    src={user.profilePic.secure_url}
                    alt={user.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </button>
            </>
          )}

          {/* Logged-out: sign in / sign up */}
          {!user && (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Hamburger (only on small screens) */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="grid h-9 w-9 place-items-center rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <nav className="space-y-1 px-4 py-4">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block rounded-lg bg-gray-100 px-3 py-2.5 text-sm font-medium text-gray-900"
                    : "block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile footer: user info + logout OR auth buttons */}
          <div className="border-t border-gray-200 px-4 py-4">
            {user ? (
              <>
                {/* Small user card */}
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
                    {user.profilePic?.secure_url ? (
                      <img
                        src={user.profilePic.secure_url}
                        alt={user.fullName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {user.fullName}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-gray-900 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
