import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, PageHeading } from "../components/UI";
import { useAuth } from "../context/AuthContext";
import { events, companies } from "../data/mockData";

export default function Dashboard() {
  const { student } = useAuth();
  const { items, xp } = useSelector((state) => state.quests);
  const completedQuests = items.filter((quest) => quest.completed).slice(0, 3);
  const completed = items.filter((quest) => quest.completed).length;
  const upcomingEvents = events.slice(0, 2);
  const today = new Date().toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).toUpperCase();

  return (
    <>
      <PageHeading eyebrow={today} title={`Good morning, ${student.name.split(" ")[0]} 👋`} description="Your campus has a lot going on. Here's your week at a glance." />
      <section className="welcome-banner">
        <div><span className="eyebrow">YOUR CAMPUS, IN MOTION</span><h2>Small steps make a<br /><span>great campus story.</span></h2><p>Pick a quest, meet someone new, or make time for a campus event.</p><Link to="/quests" className="button button-light">Explore quests <span aria-hidden="true">→</span></Link></div>
        <div className="banner-orbit" aria-hidden="true"><span>✦</span><b>CQ</b><i>✧</i></div>
      </section>
      <section className="stats-grid">
        <Card className="stat-card"><span className="stat-icon cyan">⚡</span><span className="stat-label">TOTAL QUEST XP</span><strong>{xp.toLocaleString()}</strong><small>Campus points earned</small></Card>
        <Card className="stat-card"><span className="stat-icon purple">✦</span><span className="stat-label">QUESTS COMPLETED</span><strong>{completed}<small className="stat-total"> / {items.length}</small></strong><small>Keep building your streak</small></Card>
        <Card className="stat-card"><span className="stat-icon green">▤</span><span className="stat-label">CURRENT SEMESTER</span><strong>{student.semester || "5"}<small className="stat-total">th</small></strong><small>{student.branch || "Student"} · in progress</small></Card>
        <Card className="stat-card"><span className="stat-icon orange">◎</span><span className="stat-label">CAMPUS CONNECTIONS</span><strong>12</strong><small>People and clubs explored</small></Card>
      </section>
      <div className="dashboard-columns">
        <Card className="content-card"><div className="section-heading"><div><p className="eyebrow">DON'T MISS OUT</p><h2>Coming up on campus</h2></div><Link to="/events" className="text-link">All events →</Link></div>
          <div className="compact-list">{upcomingEvents.map((event) => <Link to="/events" className="list-row event-row" key={event.id}><span className="list-emoji">{event.emoji}</span><span className="list-main"><strong>{event.title}</strong><small>{new Date(`${event.date}T12:00:00`).toLocaleDateString("en", { month: "short", day: "numeric" })} · {event.venue}</small></span><span className="row-arrow">→</span></Link>)}</div>
        </Card>
        <Card className="content-card"><div className="section-heading"><div><p className="eyebrow">YOUR NEXT STEP</p><h2>Quick links</h2></div></div>
          <div className="quick-links"><Link to="/academics"><span>▤</span>Academic hub <b>→</b></Link><Link to="/timetable"><span>▦</span>My timetable <b>→</b></Link><Link to="/lost-found"><span>⌕</span>Lost & Found <b>→</b></Link><Link to={`/companies/${companies[0].id}`}><span>⌘</span>Company visits <b>→</b></Link></div>
        </Card>
      </div>
      <Card className="content-card activity-card"><div className="section-heading"><div><p className="eyebrow">YOUR CAMPUS TRAIL</p><h2>Recent activity</h2></div><Link to="/quests" className="text-link">See all quests →</Link></div>{completedQuests.length ? <div className="activity-list">{completedQuests.map((quest) => <div className="activity-row" key={quest.id}><span className="activity-check">✓</span><span><strong>{quest.title}</strong><small>Quest completed · {quest.xp} XP earned</small></span><span className="activity-date">{quest.completedAt ? new Date(quest.completedAt).toLocaleDateString("en", { month: "short", day: "numeric" }) : "Completed"}</span></div>)}</div> : <p className="muted activity-empty">Your campus story starts with one small win. Complete a quest to see it here.</p>}</Card>
      <Card className="content-card company-strip"><div className="section-heading"><div><p className="eyebrow">CAREER CONNECTIONS</p><h2>Companies visiting soon</h2></div><Link to="/companies" className="text-link">Explore visits →</Link></div><div className="company-mini-grid">{companies.slice(0, 3).map((company) => <Link to={`/companies/${company.id}`} className="company-mini" key={company.id}><span className="company-emoji">{company.emoji}</span><span><strong>{company.name}</strong><small>{company.roles}</small></span></Link>)}</div></Card>
    </>
  );
}
