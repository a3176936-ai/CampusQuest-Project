import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Card, PageHeading } from "../components/UI";
import { useAuth } from "../context/AuthContext";
import { leaderboardStudents } from "../data/mockData";

export default function Leaderboard() {
  const { student } = useAuth();
  const xp = useSelector((state) => state.quests.xp);
  const ranked = useMemo(() => [...leaderboardStudents.filter((person) => person.email !== student.email), { name: student.name, branch: student.branch || "Campus student", xp, avatar: student.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase(), email: student.email }].sort((a, b) => b.xp - a.xp), [student, xp]);
  const ownRank = ranked.findIndex((person) => person.email === student.email) + 1;
  return (
    <>
      <PageHeading eyebrow="CELEBRATE THE JOURNEY" title="Campus leaderboard" description="Friendly campus competition, powered by the quests you complete." />
      <Card className="leaderboard-hero"><span className="leader-crown">♛</span><div><p className="eyebrow">YOUR CURRENT POSITION</p><h2>#{ownRank} <span>on the board</span></h2><p>{xp.toLocaleString()} XP · Finish more quests to climb higher.</p></div><span className="leaderboard-trophy">🏆</span></Card>
      <Card className="content-card"><div className="section-heading"><div><p className="eyebrow">STUDENT COMMUNITY</p><h2>Top questers</h2></div><span className="badge badge-purple">THIS SEMESTER</span></div><div className="rank-list">{ranked.map((person, index) => <div className={`rank-row${person.email === student.email ? " rank-row-self" : ""}`} key={person.email || person.name}><span className={`rank-number${index < 3 ? " rank-top" : ""}`}>{String(index + 1).padStart(2, "0")}</span><span className="avatar">{person.avatar}</span><span className="rank-person"><strong>{person.name}{person.email === student.email && <span className="you-tag">YOU</span>}</strong><small>{person.branch}</small></span><span className="rank-xp"><strong>{person.xp.toLocaleString()}</strong><small>XP</small></span></div>)}</div></Card>
    </>
  );
}
