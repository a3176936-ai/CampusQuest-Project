import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Select } from "../components/UI";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";

const blankForm = { name: "", email: "", password: "", confirmPassword: "", branch: "", semester: "" };

export default function Register() {
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const { notify } = useNotifications();
  const navigate = useNavigate();

  function change(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Enter a valid college email.";
    if (form.password.length < 8 || !/\d/.test(form.password)) nextErrors.password = "Use at least 8 characters and include a number.";
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = "Passwords do not match.";
    if (!form.branch) nextErrors.branch = "Choose your department or branch.";
    if (!form.semester) nextErrors.semester = "Choose your semester.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    register({ name: form.name.trim(), email: form.email, branch: form.branch, semester: form.semester });
    notify("Your demo student profile is ready.", "success");
    navigate("/dashboard");
  }

  return (
    <div className="auth-page register-page"><section className="auth-card register-card">
      <Link to="/login" className="brand auth-brand"><span className="brand-mark">C</span><span>Campus<span className="brand-accent">Quest</span><small>YOUR CAMPUS, IN MOTION</small></span></Link>
      <p className="eyebrow">START YOUR STORY</p><h1>Make campus<br /><span>feel a little closer.</span></h1><p className="muted">Create your demo student profile to get started.</p>
      <form className="auth-form form-grid" onSubmit={submit} noValidate>
        <Input label="Full name" name="name" placeholder="Your name" autoComplete="name" value={form.name} onChange={change} error={errors.name} required />
        <Input label="College email" name="email" type="email" placeholder="you@college.edu" autoComplete="email" value={form.email} onChange={change} error={errors.email} required />
        <Input label="Password" name="password" type="password" placeholder="At least 8 characters + a number" autoComplete="new-password" value={form.password} onChange={change} error={errors.password} required minLength={8} />
        <Input label="Confirm password" name="confirmPassword" type="password" placeholder="Enter password again" autoComplete="new-password" value={form.confirmPassword} onChange={change} error={errors.confirmPassword} required />
        <Select label="Department or branch" name="branch" value={form.branch} onChange={change} error={errors.branch} required><option value="">Choose department</option><option>Computer Science</option><option>Information Technology</option><option>Electrical Engineering</option><option>Mechanical Engineering</option><option>Design</option><option>Business</option></Select>
        <Select label="Semester" name="semester" value={form.semester} onChange={change} error={errors.semester} required><option value="">Choose semester</option>{Array.from({ length: 8 }, (_, index) => <option value={String(index + 1)} key={index}>Semester {index + 1}</option>)}</Select>
        <Button type="submit" className="full-button field-full">Create demo profile →</Button>
      </form>
      <p className="auth-switch">Already have a profile? <Link to="/login">Sign in</Link></p><p className="auth-disclaimer">This evaluation app stores profile details in this browser only. Passwords are never stored.</p>
    </section></div>
  );
}
