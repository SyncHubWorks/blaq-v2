import { Link } from "react-router";
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

// Columns of links shown in the footer
const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", path: "/features" },
      { name: "Pricing", path: "/pricing" },
      { name: "Changelog", path: "/changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", path: "/blog" },
      { name: "Help center", path: "/help" },
      { name: "Community", path: "/community" },
    ],
  },
];

// Social icons shown on the right (from react-icons)
const socials = [
  { name: "X (Twitter)", icon: FaXTwitter, path: "https://x.com" },
  { name: "Instagram", icon: FaInstagram, path: "https://instagram.com" },
  { name: "LinkedIn", icon: FaLinkedin, path: "https://linkedin.com" },
  { name: "GitHub", icon: FaGithub, path: "https://github.com" },
];

function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top section: brand + link columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand block */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gray-900 text-sm font-bold text-white">
                B
              </div>
              <span className="text-base font-semibold text-gray-900">
                Blaq Studio
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-gray-500">
              Building clean, modern digital experiences for brands that care
              about the details.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="grid h-9 w-9 place-items-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-gray-900">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section: copyright + legal links */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Blaq Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
