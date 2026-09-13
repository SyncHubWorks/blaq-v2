import { Link } from "react-router";
import {
  ArrowUpRight,
  Bell,
  Calendar,
  Clock,
  DollarSign,
  Plus,
  Scissors,
  Star,
  UserPlus,
  Users,
} from "lucide-react";

// Today's appointments for the owner
const todayAppointments = [
  {
    id: "a1",
    client: "Thabo K.",
    service: "Fade + lineup",
    time: "09:00",
    status: "Confirmed",
  },
  {
    id: "a2",
    client: "Ayanda M.",
    service: "Beard trim",
    time: "10:30",
    status: "Confirmed",
  },
  {
    id: "a3",
    client: "Naledi P.",
    service: "Full cut",
    time: "13:00",
    status: "Pending",
  },
  {
    id: "a4",
    client: "Lerato S.",
    service: "Kids cut",
    time: "15:30",
    status: "Confirmed",
  },
];

// Services offered
const services = [
  { id: "s1", name: "Fade", price: "R120", duration: "30 min" },
  { id: "s2", name: "Beard trim", price: "R80", duration: "20 min" },
  { id: "s3", name: "Full cut + beard", price: "R180", duration: "45 min" },
];

// Recent clients
const recentClients = [
  { id: "c1", name: "Thabo K.", visits: "8 visits" },
  { id: "c2", name: "Ayanda M.", visits: "5 visits" },
  { id: "c3", name: "Naledi P.", visits: "3 visits" },
];

function BusinessDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back, Blaq Cuts
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              You have 4 appointments today.
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
              to="/appointments/new"
              className="flex h-10 items-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Plus className="h-4 w-4" />
              New appointment
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Today's bookings", value: "4", icon: Calendar },
            { label: "This week's earnings", value: "R4,860", icon: DollarSign },
            { label: "Active clients", value: "128", icon: Users },
            { label: "Avg. rating", value: "4.8", icon: Star },
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

        {/* Quick actions */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-gray-900">Quick actions</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Add client", icon: UserPlus, to: "/clients/new" },
              { label: "Manage services", icon: Scissors, to: "/services" },
              { label: "Set availability", icon: Clock, to: "/availability" },
              { label: "View analytics", icon: DollarSign, to: "/analytics" },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-900 hover:bg-gray-50"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-gray-100 text-gray-700 transition group-hover:bg-gray-900 group-hover:text-white">
                  <action.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Two columns */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Today's appointments */}
          <div className="rounded-2xl border border-gray-200 bg-white lg:col-span-2">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Today's appointments
              </h2>
              <Link
                to="/appointments"
                className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900"
              >
                View all
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <ul className="divide-y divide-gray-100">
              {todayAppointments.map((appt) => (
                <li
                  key={appt.id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                      {appt.client.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {appt.client}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {appt.service}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-xs font-medium text-gray-700">
                      {appt.time}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${appt.status === "Confirmed"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column */}
          <div className="space-y-6">

            {/* Services */}
            <div className="rounded-2xl border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Your services
                </h2>
                <Link
                  to="/services"
                  className="text-xs font-medium text-gray-500 hover:text-gray-900"
                >
                  Manage
                </Link>
              </div>
              <ul className="divide-y divide-gray-100">
                {services.map((service) => (
                  <li
                    key={service.id}
                    className="flex items-center justify-between px-5 py-3.5"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {service.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {service.duration}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {service.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent clients */}
            <div className="rounded-2xl border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Recent clients
                </h2>
                <Link
                  to="/clients"
                  className="text-xs font-medium text-gray-500 hover:text-gray-900"
                >
                  View all
                </Link>
              </div>
              <ul className="divide-y divide-gray-100">
                {recentClients.map((client) => (
                  <li
                    key={client.id}
                    className="flex items-center gap-3 px-5 py-3.5"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                      {client.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {client.name}
                      </p>
                      <p className="text-xs text-gray-500">{client.visits}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDashboard;