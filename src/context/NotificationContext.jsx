import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setNotifications((current) => current.filter((item) => item.id !== id));
  }, []);

  const notify = useCallback((message, type = "info") => {
    const id = `${Date.now()}-${Math.random()}`;
    setNotifications((current) => [...current, { id, message, type }]);
    timers.current.set(id, setTimeout(() => dismiss(id), 4500));
  }, [dismiss]);

  const value = useMemo(() => ({ notify, dismiss }), [notify, dismiss]);
  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-relevant="additions">
        {notifications.map((item) => (
          <div className={`toast toast-${item.type}`} key={item.id} role="status">
            <span>{item.message}</span>
            <button type="button" className="toast-dismiss" onClick={() => dismiss(item.id)} aria-label="Dismiss notification">×</button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider.");
  return context;
}
