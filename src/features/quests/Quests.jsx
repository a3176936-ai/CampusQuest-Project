import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, EmptyState, Input, Modal, PageHeading, Select } from "../../components/UI";
import { useNotifications } from "../../context/NotificationContext";
import { questAdded, questCompleted } from "./questSlice";

const categories = ["All categories", "Academic", "Campus", "Community"];

export default function Quests() {
  const { items, xp } = useSelector((state) => state.quests);
  const dispatch = useDispatch();
  const { notify } = useNotifications();
  const [status, setStatus] = useState("All quests");
  const [category, setCategory] = useState("All categories");
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "Campus", xp: "100" });
  const [error, setError] = useState("");
  const completeCount = items.filter((quest) => quest.completed).length;
  const progress = items.length ? Math.round((completeCount / items.length) * 100) : 0;
  const visible = useMemo(() => items.filter((quest) => {
    return (status === "All quests" || (status === "To do" ? !quest.completed : quest.completed))
      && (category === "All categories" || quest.category === category);
  }), [items, status, category]);
  const level = Math.floor(xp / 500) + 1;

  function complete(quest) {
    if (quest.completed) return;
    dispatch(questCompleted(quest.id));
    notify(`Quest complete! +${quest.xp} XP`, "success");
  }

  function createQuest(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError("Add a title and a short description.");
      return;
    }
    const reward = Number(form.xp);
    if (!Number.isInteger(reward) || reward < 10 || reward > 500) {
      setError("Choose an XP reward from 10 to 500.");
      return;
    }
    dispatch(questAdded({ ...form, title: form.title.trim(), description: form.description.trim(), xp: reward }));
    setForm({ title: "", description: "", category: "Campus", xp: "100" });
    setError("");
    setIsCreating(false);
    notify("Your new quest has been added.", "success");
  }

  return (
    <>
      <PageHeading eyebrow="LITTLE WINS ADD UP" title="Campus quests" description="Choose a challenge, make it yours, and earn XP for showing up." action={<Button type="button" onClick={() => setIsCreating(true)}>＋ Create quest</Button>} />
      <Card className="quest-progress-card"><div className="quest-level"><span className="level-star">✦</span><span><small>YOUR CAMPUS LEVEL</small><strong>Level {level}</strong></span></div><div className="quest-progress-main"><div className="quest-progress-label"><span>{xp} XP total</span><span>{xp % 500} / 500 XP to level {level + 1}</span></div><div className="progress-track"><span style={{ width: `${(xp % 500) / 5}%` }} /></div></div><div className="quest-completion"><strong>{completeCount}<span> / {items.length}</span></strong><small>quests complete</small></div></Card>
      <div className="section-heading quest-heading"><div><p className="eyebrow">YOUR CHALLENGES</p><h2>Ready when you are</h2></div><div className="toolbar"><Select label="Quest status" name="quest-status" className="compact-select" value={status} onChange={(event) => setStatus(event.target.value)}><option>All quests</option><option>To do</option><option>Completed</option></Select><Select label="Quest category" name="quest-category" className="compact-select" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</Select></div></div>
      <div className="quest-grid">{visible.map((quest) => <article className={`quest-card${quest.completed ? " quest-completed" : ""}`} key={quest.id}><div className="quest-card-top"><span className="quest-symbol">{quest.category === "Academic" ? "▤" : quest.category === "Community" ? "♧" : "✦"}</span><span className="badge badge-purple">{quest.category}</span></div><h3>{quest.title}</h3><p className="muted">{quest.description}</p><div className="quest-card-bottom"><span className="xp-reward">⚡ {quest.xp} XP</span><Button type="button" variant={quest.completed ? "secondary" : "primary"} disabled={quest.completed} onClick={() => complete(quest)}>{quest.completed ? "✓ Completed" : "Complete quest"}</Button></div></article>)}</div>
      {!visible.length && <Card><EmptyState title="No quests in this view" description="Try another category or add a challenge of your own." action={<Button type="button" onClick={() => setIsCreating(true)}>Create a quest</Button>} /></Card>}
      {isCreating && <Modal title="Create a campus quest" onClose={() => setIsCreating(false)}><form className="modal-form" onSubmit={createQuest}><Input label="Quest title" name="title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} maxLength={64} required /><label className="field" htmlFor="quest-description"><span className="field-label">Description</span><textarea className="input textarea" id="quest-description" rows={3} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} maxLength={180} required /></label><Select label="Category" name="category" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}><option>Academic</option><option>Campus</option><option>Community</option></Select><Input label="XP reward (10–500)" name="xp" type="number" min="10" max="500" value={form.xp} onChange={(event) => setForm((current) => ({ ...current, xp: event.target.value }))} />{error && <p className="field-error">{error}</p>}<div className="modal-actions"><Button type="button" variant="secondary" onClick={() => setIsCreating(false)}>Cancel</Button><Button type="submit">Add quest</Button></div></form></Modal>}
    </>
  );
}
