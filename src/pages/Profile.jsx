import { useState } from "react";
import { Button, Card, Input, PageHeading, Select } from "../components/UI";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";
import { useSelector } from "react-redux";

export default function Profile() {
  const { student, updateProfile } = useAuth();
  const { xp, items } = useSelector((state) => state.quests);
  const { notify } = useNotifications();
  const [form, setForm] = useState({ name: student.name, branch: student.branch || "", semester: student.semester || "1", bio: student.bio || "" });
  const [errors, setErrors] = useState({});
  function change(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }
  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Enter your name.";
    if (!form.branch) nextErrors.branch = "Choose a department.";
    if (form.bio.length > 180) nextErrors.bio = "Keep your bio under 180 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    updateProfile({ ...form, name: form.name.trim(), bio: form.bio.trim() });
    notify("Your profile has been updated.", "success");
  }
  const initials = student.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  const completedQuests = items.filter((quest) => quest.completed);
  const achievements = [
    { title: "First steps", description: "Complete your first campus quest.", earned: completedQuests.length >= 1, icon: "✦" },
    { title: "Quest explorer", description: "Complete three campus quests.", earned: completedQuests.length >= 3, icon: "⌖" },
    { title: "Level two", description: "Earn 500 quest XP.", earned: xp >= 500, icon: "⚡" },
    { title: "Community builder", description: "Complete two community quests.", earned: completedQuests.filter((quest) => quest.category === "Community").length >= 2, icon: "♧" },
  ];

  return (
    <>
      <PageHeading eyebrow="YOUR CAMPUS IDENTITY" title="My profile" description="Keep your student details up to date across CampusQuest." />
      <div className="profile-layout"><Card className="profile-summary"><span className="profile-avatar">{initials}</span><h2>{student.name}</h2><p className="muted">{student.branch || "Campus student"}</p><span className="badge badge-cyan">Semester {student.semester}</span><div className="profile-summary-stats"><span><strong>{xp}</strong><small>Quest XP</small></span><span><strong>{student.email}</strong><small>College email</small></span></div></Card>
        <Card className="content-card profile-form-card"><p className="eyebrow">PERSONAL DETAILS</p><h2>Edit profile</h2><form className="form-grid" onSubmit={submit} noValidate><Input label="Full name" name="name" value={form.name} onChange={change} error={errors.name} autoComplete="name" /><Input label="College email" name="email" type="email" value={student.email} disabled /><Select label="Department or branch" name="branch" value={form.branch} onChange={change} error={errors.branch}><option value="">Choose a department</option><option>Computer Science</option><option>Information Technology</option><option>Electrical Engineering</option><option>Mechanical Engineering</option><option>Design</option><option>Business</option></Select><Select label="Semester" name="semester" value={form.semester} onChange={change}><option value="1">Semester 1</option><option value="2">Semester 2</option><option value="3">Semester 3</option><option value="4">Semester 4</option><option value="5">Semester 5</option><option value="6">Semester 6</option><option value="7">Semester 7</option><option value="8">Semester 8</option></Select><label className="field field-full" htmlFor="bio"><span className="field-label">About me</span><textarea id="bio" className="input textarea" name="bio" value={form.bio} onChange={change} maxLength={180} rows={4} /><span className={errors.bio ? "field-error" : "field-hint"}>{errors.bio || `${form.bio.length}/180 characters`}</span></label><div className="field-full form-actions"><Button type="submit">Save profile</Button></div></form></Card>
      </div>
      <div className="profile-activity-grid"><Card className="content-card"><div className="section-heading"><div><p className="eyebrow">MILESTONES</p><h2>Achievements</h2></div></div><div className="achievement-list">{achievements.map((achievement) => <div className={`achievement-row${achievement.earned ? " achievement-earned" : ""}`} key={achievement.title}><span>{achievement.icon}</span><div><strong>{achievement.title}</strong><small>{achievement.description}</small></div><span className="achievement-state">{achievement.earned ? "Earned" : "In progress"}</span></div>)}</div></Card><Card className="content-card"><div className="section-heading"><div><p className="eyebrow">YOUR CAMPUS TRAIL</p><h2>Recent activity</h2></div></div>{completedQuests.length ? <div className="activity-list">{completedQuests.slice(0, 4).map((quest) => <div className="activity-row" key={quest.id}><span className="activity-check">✓</span><span><strong>{quest.title}</strong><small>Quest completed · {quest.xp} XP</small></span></div>)}</div> : <p className="muted activity-empty">Complete a quest and your recent activity will appear here.</p>}</Card></div>
    </>
  );
}
