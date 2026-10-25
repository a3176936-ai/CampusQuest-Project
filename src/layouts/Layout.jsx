import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const links = [
  { to: "/dashboard", label: "Overview", icon: "⌂", end: true },
  { to: "/academics", label: "Academics", icon: "▤" },
  { to: "/timetable", label: "Timetable", icon: "▦" },
  { to: "/quests", label: "Quests", icon: "✦" },
  { to: "/leaderboard", label: "Leaderboard", icon: "♛" },
  { to: "/events", label: "Events", icon: "◷" },
  { to: "/companies", label: "Companies", icon: "⌘" },
  { to: "/lost-found", label: "Lost & Found", icon: "⌕" },
];

const pageNames = {
  "/dashboard": "Overview", "/academics": "Academics", "/timetable": "Timetable",
  "/quests": "Campus quests", "/leaderboard": "Leaderboard", "/events": "Campus events",
  "/companies": "Company visits", "/lost-found": "Lost & Found", "/profile": "My profile", "/settings": "Settings",
};

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { student, logout } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const title = pageNames[location.pathname] || (location.pathname.startsWith("/companies/") ? "Company details" : "CampusQuest");
  const initials = student?.name?.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase() || "CQ";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="app-shell">
      {menuOpen && <button aria-label="Close navigation" className="sidebar-scrim" onClick={() => setMenuOpen(false)} />}
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <NavLink to="/dashboard" className="brand" onClick={() => setMenuOpen(false)}><span className="brand-mark">C</span><span>Campus<span className="brand-accent">Quest</span><small>YOUR CAMPUS, IN MOTION</small></span></NavLink>
        <div className="sidebar-label">STUDENT SPACE</div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`}><span className="nav-icon">{link.icon}</span>{link.label}{link.to === "/quests" && <span className="nav-dot" />}</NavLink>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-label">ACCOUNT</div>
          <NavLink to="/profile" onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`}><span className="nav-icon">◎</span>My profile</NavLink>
          <NavLink to="/settings" onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`}><span className="nav-icon">⚙</span>Settings</NavLink>
          <div className="sidebar-user"><span className="avatar">{initials}</span><span className="sidebar-user-copy"><strong>{student?.name}</strong><small>{student?.branch || "Campus student"}</small></span><button className="icon-button sidebar-logout" type="button" onClick={handleLogout} title="Log out" aria-label="Log out">↪</button></div>
        </div>
      </aside>
      <div className="main-column">
        <header className="topbar">
          <button className="mobile-menu icon-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open navigation">☰</button>
          <div><p className="topbar-kicker">CAMPUSQUEST / STUDENT SPACE</p><h2>{title}</h2></div>
          <div className="topbar-actions"><button className="icon-button theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>{theme === "dark" ? "☼" : "☾"}</button><NavLink className="avatar topbar-avatar" to="/profile" aria-label="Open profile">{initials}</NavLink></div>
        </header>
        <main className="main-content"><Outlet /></main>
        <footer className="app-footer"><span>CampusQuest <span aria-hidden="true">✦</span> Make your campus count.</span><span>DEMO DATA · LOCAL TO THIS BROWSER</span></footer>
      </div>
    </div>
  );
}
