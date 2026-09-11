import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Bell, Menu, Search, X } from "lucide-react";

// Links shown in the navbar
const links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Projects", path: "/projects" },
  { name: "Clients", path: "/clients" },
  { name: "Settings", path: "/settings" },
];

function Navbar() {
  // Controls the mobile menu (hamburger)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
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

        {/* Right side: search, bell, mobile menu button */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search (hidden on small screens) */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-48 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-900 outline-none focus:border-gray-300 focus:bg-white"
            />
          </div>

          {/* Notification bell */}
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Bell className="h-5 w-5" />
          </button>

          {/* Avatar (hidden on small screens) */}
          <button
            type="button"
            className="hidden h-9 w-9 place-items-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700 sm:grid"
          >
            BS
          </button>

          {/* Hamburger button (only on small screens) */}
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

      {/* Mobile menu (shows when isMenuOpen is true) */}
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
        </div>
      )}
    </header>
  );
}

export default Navbar;
