import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, EmptyState, Input, PageHeading, Select } from "../components/UI";
import { companies } from "../data/mockData";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

export default function Companies() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("All sectors");
  const debouncedQuery = useDebouncedValue(query);
  const sectors = ["All sectors", ...new Set(companies.map((company) => company.sector))];
  const visible = useMemo(() => companies.filter((company) => {
    const matchesText = `${company.name} ${company.roles} ${company.eligibility} ${company.sector}`.toLowerCase().includes(debouncedQuery.toLowerCase());
    return matchesText && (sector === "All sectors" || company.sector === sector);
  }), [debouncedQuery, sector]);

  return (
    <>
      <PageHeading eyebrow="YOUR NEXT OPPORTUNITY" title="Company visits" description="Meet teams, learn about their work, and find opportunities that fit your goals." />
      <Card className="content-card"><div className="section-heading"><div><p className="eyebrow">ON-CAMPUS CONNECT</p><h2>Upcoming visits</h2></div><div className="toolbar"><Input label="Search companies" name="company-search" placeholder="Company, role, eligibility…" value={query} onChange={(event) => setQuery(event.target.value)} /><Select label="Sector" name="company-sector" className="compact-select" value={sector} onChange={(event) => setSector(event.target.value)}>{sectors.map((item) => <option key={item}>{item}</option>)}</Select></div></div>
        <div className="company-grid">{visible.map((company) => <article className="company-card" key={company.id}><div className="company-card-heading"><span className="company-emoji">{company.emoji}</span><span className="badge badge-cyan">{company.sector}</span></div><h3>{company.name}</h3><p className="muted">{company.roles}</p><div className="company-info"><p><span>◷</span><span><small>VISIT DATE</small><strong>{new Date(`${company.visitDate}T12:00:00`).toLocaleDateString("en", { month: "long", day: "numeric" })}</strong></span></p><p><span>✓</span><span><small>ELIGIBILITY</small><strong>{company.eligibility}</strong></span></p><p><span>↗</span><span><small>PROGRAM</small><strong>{company.package}</strong></span></p></div><Link className="button button-secondary full-button" to={`/companies/${company.id}`}>View company details →</Link></article>)}</div>
        {!visible.length && <EmptyState title="No companies match" description="Try another search term or sector." />}
      </Card>
    </>
  );
}
