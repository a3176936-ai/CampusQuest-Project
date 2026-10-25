import { Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Academics from "./pages/Academics";
import Timetable from "./pages/Timetable";
import Quests from "./features/quests/Quests";
import Leaderboard from "./pages/Leaderboard";
import Events from "./pages/Events";
import Companies from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";
import LostFound from "./pages/LostFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { PageHeading } from "./components/UI";

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function NotFound() {
  return <div className="auth-page"><section className="auth-card"><span className="brand-mark">?</span><PageHeading title="Page not found" description="That page is not part of this campus map." /><Link className="button button-primary" to="/dashboard">Back to overview</Link></section></div>;
}

export default function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="academics" element={<Academics />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="quests" element={<Quests />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="events" element={<Events />} />
          <Route path="companies" element={<Companies />} />
          <Route path="companies/:companyId" element={<CompanyDetails />} />
          <Route path="lost-found" element={<LostFound />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
