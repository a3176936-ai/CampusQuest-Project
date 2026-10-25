import { useEffect } from "react";

export function Button({ children, variant = "primary", className = "", ...props }) {
  return <button className={`button button-${variant} ${className}`.trim()} {...props}>{children}</button>;
}

export function Input({ label, error, id, className = "", ...props }) {
  const inputId = id || props.name;
  return (
    <label className="field" htmlFor={inputId}>
      <span className="field-label">{label}</span>
      <input id={inputId} className={`input ${error ? "input-error" : ""} ${className}`.trim()} aria-invalid={Boolean(error)} aria-describedby={error ? `${inputId}-error` : undefined} {...props} />
      {error && <span className="field-error" id={`${inputId}-error`}>{error}</span>}
    </label>
  );
}

export function Select({ label, error, id, className = "", children, ...props }) {
  const selectId = id || props.name;
  return (
    <label className="field" htmlFor={selectId}>
      <span className="field-label">{label}</span>
      <select id={selectId} className={`input ${error ? "input-error" : ""} ${className}`.trim()} aria-invalid={Boolean(error)} aria-describedby={error ? `${selectId}-error` : undefined} {...props}>
        {children}
      </select>
      {error && <span className="field-error" id={`${selectId}-error`}>{error}</span>}
    </label>
  );
}

export function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="muted page-description">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }) {
  return <section className={`card ${className}`.trim()}>{children}</section>;
}

export function EmptyState({ title, description, action }) {
  return <div className="empty-state"><span className="empty-icon" aria-hidden="true">✦</span><h3>{title}</h3><p className="muted">{description}</p>{action}</div>;
}

export function Modal({ title, onClose, children, wide = false }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className={`modal ${wide ? "modal-wide" : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-heading"><h2 id="modal-title">{title}</h2><button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog">×</button></div>
        {children}
      </section>
    </div>
  );
}

export function Spinner({ label = "Loading" }) {
  return <div className="loading-state" role="status"><span className="spinner" />{label}…</div>;
}
