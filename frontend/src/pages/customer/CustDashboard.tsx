import { Link } from "react-router";
import {
  ArrowUpRight,
  Bell,
  Calendar,
  CheckCircle2,
  MessageSquare,
  Search,
  Star,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

// Upcoming bookings shown in the list
const upcomingBookings = [
  {
    id: "b1",
    service: "Brand consultation",
    provider: "Blaq Studio",
    date: "Tue, 14:00",
    status: "Confirmed",
  },
  {
    id: "b2",
    service: "Website review",
    provider: "Blaq Studio",
    date: "Thu, 10:30",
    status: "Pending",
  },
  {
    id: "b3",
    service: "Logo design",
    provider: "Naledi P.",
    date: "Mon, 09:00",
    status: "Confirmed",
  },
];

// Recommended services for the user
const recommended = [
  { id: "r1", name: "Logo design package", price: "From R2,500" },
  { id: "r2", name: "Social media kit", price: "From R1,800" },
  { id: "r3", name: "Brand identity", price: "From R4,200" },
];

function CustDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back, {user?.fullName}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Here's what's happening with your bookings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            >
              <Bell className="h-4 w-4" />
            </button>
            <Link
              to="/services"
              className="flex h-10 items-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Search className="h-4 w-4" />
              Browse services
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Upcoming bookings", value: "3", icon: Calendar },
            { label: "Saved services", value: "12", icon: Star },
            { label: "Unread messages", value: "5", icon: MessageSquare },
            { label: "Reviews left", value: "4", icon: CheckCircle2 },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gray-100 text-gray-700">
                <stat.icon className="h-4 w-4" />
              </span>
              <p className="mt-4 text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p className="mt-0.5 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Two columns */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Upcoming bookings */}
          <div className="rounded-2xl border border-gray-200 bg-white lg:col-span-2">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Upcoming bookings
              </h2>
              <Link
                to="/bookings"
                className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900"
              >
                View all
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <ul className="divide-y divide-gray-100">
              {upcomingBookings.map((booking) => (
                <li
                  key={booking.id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {booking.service}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {booking.provider} • {booking.date}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      booking.status === "Confirmed"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended */}
          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Recommended for you
              </h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {recommended.map((item) => (
                <li key={item.id} className="px-5 py-4">
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">{item.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustDashboard;
