import { useMemo, useState } from "react";
import { Card, PageHeading } from "../components/UI";
import { timetable } from "../data/mockData";

const days = Object.keys(timetable);

export default function Timetable() {
  const [day, setDay] = useState(days[0]);
  const nextClass = useMemo(() => timetable[day][0], [day]);
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  return (
    <>
      <PageHeading eyebrow="MAKE ROOM FOR WHAT MATTERS" title="My timetable" description="Your week, organized in one place. Select a day to see what’s on." />
      <Card className="content-card"><div className="timetable-toolbar"><div><p className="eyebrow">WEEKLY SCHEDULE</p><h2>Week of {weekStart.toLocaleDateString("en", { month: "long", day: "numeric" })}</h2></div><span className="badge badge-cyan">{timetable[day].length} sessions</span></div>
        <div className="day-tabs" role="tablist" aria-label="Choose day">{days.map((item, index) => { const date = new Date(weekStart); date.setDate(weekStart.getDate() + index); return <button type="button" role="tab" aria-selected={day === item} className={`day-tab${day === item ? " day-tab-active" : ""}`} key={item} onClick={() => setDay(item)}><span>{item.slice(0, 3)}</span><strong>{date.getDate()}</strong></button>; })}</div>
        <div className="today-highlight"><span>UP NEXT · {nextClass[0]}</span><strong>{nextClass[1]}</strong><small>{nextClass[2]}</small></div>
        <div className="schedule-list">{timetable[day].map(([time, title, room], index) => <div className="schedule-row" key={`${time}-${title}`}><span className="schedule-time">{time}</span><span className={`schedule-marker ${index % 2 ? "marker-purple" : ""}`} /><span className="schedule-details"><strong>{title}</strong><small>{room}</small></span><span className="badge badge-neutral">{index === 2 ? "Activity" : "Class"}</span></div>)}</div>
      </Card>
    </>
  );
}
