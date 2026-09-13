import { Link } from "react-router";
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  Briefcase,
  CheckCircle2,
  Clock,
  Flag,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

// Pending approvals
const pendingApprovals = [
  {
    id: "a1",
    name: "Blaq Collective",
    type: "New business",
    submitted: "2h ago",
  },
  {
    id: "a2",
    name: "Zanele D.",
    type: "Verification request",
    submitted: "5h ago",
  },
  {
    id: "a3",
    name: "Kasi Digital",
    type: "Updated details",
    submitted: "1d ago",
  },
];

// Recent signups
const recentSignups = [
  { id: "s1", name: "Lerato M.", role: "Business owner", time: "2m ago" },
  { id: "s2", name: "Sipho N.", role: "Customer", time: "18m ago" },
  { id: "s3", name: "Blaq Studio HQ", role: "Business owner", time: "1h ago" },
];

// Flagged content
const flaggedItems = [
  { id: "f1", title: "Suspicious listing", by: "User #4821", reason: "Spam" },
  { id: "f2", title: "Reported review", by: "Naledi P.", reason: "Abuse" },
];

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Admin overview
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Platform health and activity at a glance.
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
              to="/admin/approvals"
              className="flex h-10 items-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white hover:bg-gray-800"
            >
              <CheckCircle2 className="h-4 w-4" />
              Review approvals
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Total users",
              value: "1,248",
              icon: Users,
              trend: "+48 this week",
            },
            {
              label: "Businesses",
              value: "326",
              icon: Briefcase,
              trend: "+12 this week",
            },
            {
              label: "Platform revenue",
              value: "R284,900",
              icon: TrendingUp,
              trend: "+8% MoM",
            },
            {
              label: "Pending approvals",
              value: "14",
              icon: Clock,
              trend: "5 flagged",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-gray-100 text-gray-700">
                  <stat.icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-medium text-gray-500">
                  {stat.trend}
                </span>
              </div>
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
              { label: "Manage users", icon: Users, to: "/admin/users" },
              {
                label: "Review approvals",
                icon: CheckCircle2,
                to: "/admin/approvals",
              },
              { label: "View reports", icon: BarChart3, to: "/admin/reports" },
              {
                label: "Platform settings",
                icon: Shield,
                to: "/admin/settings",
              },
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

        {/* Three columns */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Pending approvals */}
          <div className="rounded-2xl border border-gray-200 bg-white lg:col-span-2">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Pending approvals
              </h2>
              <Link
                to="/admin/approvals"
                className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900"
              >
                Review all
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <ul className="divide-y divide-gray-100">
              {pendingApprovals.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {item.type} • {item.submitted}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Review
                    </button>
                    <button
                      type="button"
                      className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800"
                    >
                      Approve
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent signups */}
          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Recent signups
              </h2>
              <Link
                to="/admin/users"
                className="text-xs font-medium text-gray-500 hover:text-gray-900"
              >
                View all
              </Link>
            </div>
            <ul className="divide-y divide-gray-100">
              {recentSignups.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center gap-3 px-5 py-3.5"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                    {user.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <span className="shrink-0 text-xs text-gray-400">
                    {user.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Flagged content */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-900">
                Flagged content
              </h2>
            </div>
            <Link
              to="/admin/flagged"
              className="text-xs font-medium text-gray-500 hover:text-gray-900"
            >
              View all
            </Link>
          </div>
          <ul className="divide-y divide-gray-100">
            {flaggedItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gray-100 text-gray-700">
                    <AlertTriangle className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      By {item.by} • {item.reason}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  Investigate
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
