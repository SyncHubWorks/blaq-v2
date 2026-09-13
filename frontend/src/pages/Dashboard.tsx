import AdminDashboard from "./admin/AdminDashboard";
import BusinessDashboard from "./business/BusinessDashboard";
import CustDashboard from "./customer/CustDashboard";
import LandingPage from "./unathorized/LandingPage";

function Dashboard() {
  const role = "admin";

  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "business":
      return <BusinessDashboard />;
    case "user":
      return <CustDashboard />;
    default:
      return <LandingPage />;
  }
}

export default Dashboard;
