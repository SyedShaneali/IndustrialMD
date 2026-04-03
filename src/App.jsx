import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./components/Analytics/MainDash";
import UserDashboard from "./screens/UserDashboard";
import Navbar from "./components/Navbar";
import CasePage from "./screens/AddCase";
import ViewFullCase from "./screens/ViewFullCase";
export default function App() {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-case" element={<CasePage mode={'add'} />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/case/view-details/:id" element={<CasePage mode={'view'} />} />
          <Route path="/case/edit-details/:id" element={<CasePage mode={'edit'} />} />
          <Route path="/case/full/:id" element={<ViewFullCase />} />



          <Route element={<DashboardLayout />}>
            <Route path="/analytics" element={<Dashboard />} />
            <Route path="/reports"   element={<Dashboard title="Reports" />} />
            <Route path="/history"   element={<Dashboard title="History" />} />
            <Route path="/clients"   element={<Dashboard title="Clients" />} />
            <Route path="/settings"  element={<Dashboard title="Settings" />} />
          </Route>
        </Routes>
    
    </div>
  );
}