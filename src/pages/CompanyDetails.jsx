import { Link, useParams } from "react-router-dom";
import { Card, PageHeading } from "../components/UI";
import { companies } from "../data/mockData";

export default function CompanyDetails() {
  const { companyId } = useParams();
  const company = companies.find((item) => item.id === companyId);
  if (!company) return <div className="page"><PageHeading title="Company not found" description="This company visit may have moved." /><Link className="button button-primary" to="/companies">Back to company visits</Link></div>;

  return (
    <>
      <Link to="/companies" className="back-link">← All company visits</Link>
      <div className="company-detail-hero"><span className="company-emoji">{company.emoji}</span><div><p className="eyebrow">{company.sector.toUpperCase()}</p><h1>{company.name}</h1><p>{company.description}</p></div></div>
      <div className="detail-columns"><Card className="content-card"><p className="eyebrow">VISIT OVERVIEW</p><h2>Make a connection</h2><p className="muted">This campus visit is a chance to learn about the team, ask questions, and understand what early-career opportunities look like.</p><div className="detail-list"><p><strong>Visit date</strong><span>{new Date(`${company.visitDate}T12:00:00`).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}</span></p><p><strong>Opportunity</strong><span>{company.roles}</span></p><p><strong>Eligibility</strong><span>{company.eligibility}</span></p><p><strong>Program</strong><span>{company.package}</span></p></div></Card><Card className="content-card"><p className="eyebrow">GET READY</p><h2>Before you go</h2><ul className="checklist"><li>Review the role and eligibility details.</li><li>Prepare a short introduction and questions.</li><li>Bring your student ID and an updated resume.</li></ul><a className="button button-primary full-button" href="mailto:careers@campusquest.edu?subject=Company%20visit%20question">Contact careers office →</a><p className="muted fine-print">Demo company details are for evaluation purposes.</p></Card></div>
    </>
  );
}
