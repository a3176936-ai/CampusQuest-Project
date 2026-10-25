import { useMemo, useState } from "react";
import { Card, EmptyState, Input, Modal, PageHeading, Select, Button } from "../components/UI";
import { useNotifications } from "../context/NotificationContext";
import { events } from "../data/mockData";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

const EVENT_KEY = "campusquest-react-registered-events";

function readRegistrations() {
  try {
    const saved = JSON.parse(localStorage.getItem(EVENT_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.error("Could not read event registrations.", error);
    return [];
  }
}

export default function Events() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [sort, setSort] = useState("Soonest first");
  const [registrations, setRegistrations] = useState(readRegistrations);
  const [selected, setSelected] = useState(null);
  const { notify } = useNotifications();
  const debouncedQuery = useDebouncedValue(query);
  const categories = ["All categories", ...new Set(events.map((event) => event.category))];
  const visible = useMemo(() => events.filter((event) => {
    const matchesText = `${event.title} ${event.description} ${event.venue}`.toLowerCase().includes(debouncedQuery.toLowerCase());
    return matchesText && (category === "All categories" || event.category === category);
  }).sort((a, b) => sort === "Soonest first" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)), [debouncedQuery, category, sort]);

  function toggleRegistration(event) {
    const registered = registrations.includes(event.id);
    const next = registered ? registrations.filter((id) => id !== event.id) : [...registrations, event.id];
    localStorage.setItem(EVENT_KEY, JSON.stringify(next));
    setRegistrations(next);
    notify(registered ? `Registration cancelled for ${event.title}.` : `You're registered for ${event.title}.`, registered ? "info" : "success");
  }

  return (
    <>
      <PageHeading eyebrow="FIND YOUR PEOPLE" title="Campus events" description="Discover what’s happening and save a spot at something you love." />
      <Card className="content-card"><div className="section-heading"><div><p className="eyebrow">WHAT'S ON</p><h2>{visible.length} upcoming events</h2></div><div className="toolbar"><Input label="Search events" name="event-search" placeholder="Search events…" value={query} onChange={(event) => setQuery(event.target.value)} /><Select label="Category" name="event-category" className="compact-select" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</Select><Select label="Sort events" name="event-sort" className="compact-select" value={sort} onChange={(event) => setSort(event.target.value)}><option>Soonest first</option><option>Latest first</option></Select></div></div>
        <div className="event-grid">{visible.map((event) => <article className="event-card" key={event.id}><div className="event-card-top"><span className="event-emoji">{event.emoji}</span><span className="badge badge-purple">{event.category}</span></div><p className="event-date">{new Date(`${event.date}T12:00:00`).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })} · {event.time}</p><h3>{event.title}</h3><p className="muted">{event.description}</p><div className="event-location">⌖ {event.venue}</div><div className="event-card-actions"><Button type="button" variant={registrations.includes(event.id) ? "secondary" : "primary"} onClick={() => toggleRegistration(event)}>{registrations.includes(event.id) ? "Cancel registration" : "Register →"}</Button><button className="text-link" type="button" onClick={() => setSelected(event)}>Details</button></div></article>)}</div>
        {!visible.length && <EmptyState title="No events found" description="Change your search or category to find more events." />}
      </Card>
      {selected && <Modal title={selected.title} onClose={() => setSelected(null)}><p className="muted">{selected.description}</p><div className="detail-list"><p><strong>When</strong><span>{selected.date} · {selected.time}</span></p><p><strong>Where</strong><span>{selected.venue}</span></p><p><strong>Hosted by</strong><span>{selected.organizer}</span></p></div><Button type="button" onClick={() => toggleRegistration(selected)}>{registrations.includes(selected.id) ? "Cancel registration" : "Register for this event"}</Button></Modal>}
    </>
  );
}
