import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../components/UI";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";
import { initialStudent } from "../data/mockData";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const { notify } = useNotifications();
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Enter your password.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    login(email);
    notify("Welcome back to CampusQuest.", "success");
    navigate("/dashboard");
  }

  function useDemoStudent() {
    login(initialStudent.email);
    notify("Signed in with the demo student account.", "success");
    navigate("/dashboard");
  }

  return (
    <div className="auth-page"><div className="auth-decoration" aria-hidden="true"><span>✦</span><i>◌</i></div><section className="auth-card">
      <Link to="/login" className="brand auth-brand"><span className="brand-mark">C</span><span>Campus<span className="brand-accent">Quest</span><small>YOUR CAMPUS, IN MOTION</small></span></Link>
      <p className="eyebrow">WELCOME BACK</p><h1>Find your next<br /><span>campus moment.</span></h1><p className="muted">Sign in to pick up where your campus story left off.</p>
      <form className="auth-form" onSubmit={submit} noValidate><Input label="College email" name="email" type="email" placeholder="you@college.edu" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} error={errors.email} required /><Input label="Password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} error={errors.password} required /><Button type="submit" className="full-button">Sign in <span>→</span></Button></form>
      <div className="auth-divider"><span>or try the evaluation account</span></div><Button type="button" variant="secondary" className="full-button" onClick={useDemoStudent}>Continue as demo student</Button><p className="auth-switch">New to CampusQuest? <Link to="/register">Create an account</Link></p><p className="auth-disclaimer">Demo only: credentials are not verified by a server. Never enter a real password.</p>
    </section><div className="auth-side-copy"><span className="eyebrow">A LITTLE MORE CAMPUS, EVERY DAY</span><h2>Find your people.<br />Build your path.<br /><span>Make it count.</span></h2><p>One space for learning, campus life, and the things you’re working toward.</p></div></div>
  );
}
