import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, EmptyState, Input, Modal, PageHeading, Select, Spinner } from "../components/UI";
import { useNotifications } from "../context/NotificationContext";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { getReports, removeReport, saveReport } from "../services/lostFoundService";

const pageSize = 6;
const emptyForm = { title: "", status: "Lost", category: "Accessories", description: "", date: new Date().toISOString().slice(0, 10), location: "", contact: "" };

export default function LostFound() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [category, setCategory] = useState("All categories");
  const [sort, setSort] = useState("Newest first");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const requestId = useRef(0);
  const debouncedQuery = useDebouncedValue(query);
  const { notify } = useNotifications();

  const loadReports = useCallback(async () => {
    const currentRequest = ++requestId.current;
    setLoading(true);
    setLoadError("");
    try {
      const data = await getReports();
      if (requestId.current === currentRequest) setReports(data);
    } catch (error) {
      if (requestId.current === currentRequest) setLoadError(error.message);
    } finally {
      if (requestId.current === currentRequest) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
    return () => { requestId.current += 1; };
  }, [loadReports]);

  const filtered = useMemo(() => reports.filter((report) => {
    const text = `${report.title} ${report.description} ${report.location} ${report.contact}`.toLowerCase();
    return text.includes(debouncedQuery.toLowerCase())
      && (status === "All statuses" || report.status === status)
      && (category === "All categories" || report.category === category);
  }).sort((a, b) => sort === "Newest first" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)), [reports, debouncedQuery, status, category, sort]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageReports = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => { setPage(1); }, [debouncedQuery, status, category, sort]);

  function openCreate() {
    setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) });
    setErrors({});
    setEditing("new");
  }

  function openEdit(report) {
    setForm({ ...report });
    setErrors({});
    setEditing(report.id);
  }

  function validate() {
    const next = {};
    if (!form.title.trim()) next.title = "Add a clear item title.";
    if (!form.description.trim()) next.description = "Describe the item.";
    if (!form.date) next.date = "Choose the date.";
    if (!form.location.trim()) next.location = "Add where it was lost or found.";
    if (!form.contact.trim()) next.contact = "Add a way to reach you.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit(event) {
    event.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const report = { ...form, id: editing === "new" ? `r-${Date.now()}` : editing, title: form.title.trim(), description: form.description.trim(), location: form.location.trim(), contact: form.contact.trim() };
      setReports(await saveReport(report));
      setEditing(null);
      notify(editing === "new" ? "Your Lost & Found report was created." : "Your report was updated.", "success");
    } catch (error) {
      setErrors((current) => ({ ...current, form: error.message }));
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    try {
      setReports(await removeReport(deleting.id));
      notify("The report was deleted.", "success");
      setDeleting(null);
    } catch (error) {
      setLoadError(error.message);
      setDeleting(null);
    }
  }

  async function markRecovered(report) {
    try {
      setReports(await saveReport({ ...report, status: "Recovered" }));
      notify("Marked as recovered. Thanks for closing the loop.", "success");
    } catch (error) {
      setLoadError(error.message);
    }
  }

  return (
    <>
      <PageHeading eyebrow="HELP SOMETHING FIND ITS WAY HOME" title="Lost & Found" description="Browse reports from around campus or post something you’re looking for." action={<Button type="button" onClick={openCreate}>＋ Post a report</Button>} />
      <Card className="content-card"><div className="lost-toolbar"><Input label="Search reports" name="report-search" placeholder="Search item, place, or details…" value={query} onChange={(event) => setQuery(event.target.value)} /><Select label="Item status" name="report-status" value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option><option>Lost</option><option>Found</option><option>Recovered</option></Select><Select label="Category" name="report-category" value={category} onChange={(event) => setCategory(event.target.value)}><option>All categories</option><option>Accessories</option><option>Books</option><option>Electronics</option><option>Other</option></Select><Select label="Sort" name="report-sort" value={sort} onChange={(event) => setSort(event.target.value)}><option>Newest first</option><option>Oldest first</option></Select></div>
        {loading ? <Spinner label="Loading campus reports" /> : loadError ? <div className="error-state"><strong>Couldn’t load reports</strong><p>{loadError}</p><Button type="button" variant="secondary" onClick={loadReports}>Retry</Button></div> : <>
          {pageReports.length ? <div className="report-grid">{pageReports.map((report) => <article className="report-card" key={report.id}><div className="report-card-heading"><span className={`badge ${report.status === "Lost" ? "badge-orange" : report.status === "Found" ? "badge-green" : "badge-neutral"}`}>{report.status}</span><span className="badge badge-neutral">{report.category}</span></div><h3>{report.title}</h3><p className="muted report-description">{report.description}</p><div className="report-meta"><span>⌖ {report.location}</span><span>◷ {new Date(`${report.date}T12:00:00`).toLocaleDateString("en", { month: "short", day: "numeric" })}</span></div><div className="report-contact">Contact: {report.contact}</div><div className="report-actions"><button type="button" className="text-link" onClick={() => openEdit(report)}>Edit</button><button type="button" className="text-link danger-link" onClick={() => setDeleting(report)}>Delete</button>{report.status !== "Recovered" && <Button type="button" variant="secondary" onClick={() => markRecovered(report)}>Mark recovered</Button>}</div></article>)}</div> : <EmptyState title="No reports found" description="Try changing your filters, or create the first report." action={<Button type="button" onClick={openCreate}>Post a report</Button>} />}
          {filtered.length > pageSize && <div className="pagination"><span>Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}</span><div><Button type="button" variant="secondary" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>← Previous</Button><span className="pagination-page">Page {page} of {pages}</span><Button type="button" variant="secondary" disabled={page >= pages} onClick={() => setPage((current) => current + 1)}>Next →</Button></div></div>}
        </>}
      </Card>
      {editing && <Modal title={editing === "new" ? "Post a Lost & Found report" : "Edit your report"} onClose={() => setEditing(null)} wide><form className="form-grid modal-form" onSubmit={submit} noValidate>
        <Input label="Item title" name="title" placeholder="What are you looking for?" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} error={errors.title} maxLength={80} />
        <Select label="Report type" name="status" value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}><option>Lost</option><option>Found</option><option>Recovered</option></Select>
        <Select label="Category" name="category" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}><option>Accessories</option><option>Books</option><option>Electronics</option><option>Other</option></Select>
        <Input label="Date" name="date" type="date" value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} error={errors.date} />
        <label className="field field-full" htmlFor="report-description"><span className="field-label">Description</span><textarea className="input textarea" id="report-description" rows={3} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} maxLength={300} />{errors.description && <span className="field-error">{errors.description}</span>}</label>
        <Input label="Location" name="location" placeholder="Where was it last seen?" value={form.location} onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} error={errors.location} />
        <Input label="Contact information" name="contact" placeholder="How can someone reach you?" value={form.contact} onChange={(event) => setForm((current) => ({ ...current, contact: event.target.value }))} error={errors.contact} />
        {errors.form && <p className="field-error field-full">{errors.form}</p>}<div className="field-full modal-actions"><Button type="button" variant="secondary" onClick={() => setEditing(null)}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save report"}</Button></div>
      </form></Modal>}
      {deleting && <Modal title="Delete this report?" onClose={() => setDeleting(null)}><p className="muted">“{deleting.title}” will be removed from Lost & Found on this browser.</p><div className="modal-actions"><Button type="button" variant="secondary" onClick={() => setDeleting(null)}>Keep report</Button><Button type="button" variant="danger" onClick={confirmDelete}>Delete report</Button></div></Modal>}
    </>
  );
}
