import { useMemo, useState } from "react";
import { Card, EmptyState, Input, PageHeading } from "../components/UI";
import { subjects } from "../data/mockData";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

export default function Academics() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("All subjects");
  const debouncedQuery = useDebouncedValue(query);
  const filtered = useMemo(() => subjects.filter((subject) => {
    const matchesText = `${subject.name} ${subject.code} ${subject.instructor}`.toLowerCase().includes(debouncedQuery.toLowerCase());
    return matchesText && (view === "All subjects" || (view === "In progress" ? subject.progress < 70 : subject.progress >= 70));
  }), [debouncedQuery, view]);

  return (
    <>
      <PageHeading eyebrow="LEARN WITH INTENTION" title="Academic hub" description="A clear view of your courses, progress, and current semester." />
      <div className="academic-overview"><Card className="semester-card"><p className="eyebrow">CURRENT SEMESTER</p><h2>Semester 5</h2><p>Computer Science · 18 credits</p><div className="progress-track"><span style={{ width: "68%" }} /></div><small>68% semester progress</small></Card><Card className="academic-metric"><span className="stat-icon cyan">▤</span><small>ENROLLED COURSES</small><strong>{subjects.length}</strong><span className="muted">This semester</span></Card><Card className="academic-metric"><span className="stat-icon purple">◷</span><small>AVERAGE PROGRESS</small><strong>{Math.round(subjects.reduce((total, subject) => total + subject.progress, 0) / subjects.length)}%</strong><span className="muted">Across all courses</span></Card></div>
      <Card className="content-card"><div className="section-heading"><div><p className="eyebrow">COURSEWORK</p><h2>Your subjects</h2></div><div className="toolbar"><Input label="Search courses" name="subject-search" placeholder="Course, code, instructor…" value={query} onChange={(event) => setQuery(event.target.value)} /><select className="input compact-select" aria-label="Filter courses" value={view} onChange={(event) => setView(event.target.value)}><option>All subjects</option><option>In progress</option><option>On track</option></select></div></div>
        <div className="subject-list">{filtered.map((subject) => <div className="subject-row" key={subject.code}><div className="subject-code">{subject.code}</div><div className="subject-main"><strong>{subject.name}</strong><small>{subject.instructor} · {subject.credits} credits</small><div className="progress-track small-progress"><span style={{ width: `${subject.progress}%` }} /></div></div><span className="subject-percent">{subject.progress}%</span><span className="grade-badge">{subject.grade}</span></div>)}</div>
        {!filtered.length && <EmptyState title="No courses match" description="Try another course name or progress filter." />}
      </Card>
    </>
  );
}
