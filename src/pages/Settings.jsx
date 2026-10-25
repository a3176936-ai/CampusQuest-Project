import { useEffect, useState } from "react";
import { Card, PageHeading } from "../components/UI";
import { useTheme } from "../context/ThemeContext";
import { useNotifications } from "../context/NotificationContext";

const PREF_KEY = "campusquest-react-preferences";

function readPreferences() {
  try {
    return JSON.parse(localStorage.getItem(PREF_KEY)) || { eventUpdates: true, questReminders: true };
  } catch (error) {
    console.error("Could not read notification preferences.", error);
    return { eventUpdates: true, questReminders: true };
  }
}

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { notify } = useNotifications();
  const [preferences, setPreferences] = useState(readPreferences);

  useEffect(() => {
    localStorage.setItem(PREF_KEY, JSON.stringify(preferences));
  }, [preferences]);

  function updatePreference(key) {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <>
      <PageHeading eyebrow="MAKE IT YOURS" title="Settings" description="Choose how CampusQuest looks and what updates you want to see." />
      <div className="settings-stack"><Card className="settings-card"><div className="settings-icon">◐</div><div className="settings-content"><h2>Appearance</h2><p className="muted">Choose a comfortable theme for your campus space.</p><div className="theme-options"><button type="button" className={`theme-option theme-option-dark${theme === "dark" ? " theme-option-selected" : ""}`} onClick={() => setTheme("dark")}><span>◐</span><strong>Dark</strong>{theme === "dark" && <i>✓</i>}</button><button type="button" className={`theme-option theme-option-light${theme === "light" ? " theme-option-selected" : ""}`} onClick={() => setTheme("light")}><span>☼</span><strong>Light</strong>{theme === "light" && <i>✓</i>}</button></div></div></Card>
        <Card className="settings-card"><div className="settings-icon">♧</div><div className="settings-content"><h2>Notification preferences</h2><p className="muted">Choose which demo updates you’d like to receive.</p><label className="preference-row"><span><strong>Campus event updates</strong><small>Registration confirmations and upcoming events</small></span><input type="checkbox" checked={preferences.eventUpdates} onChange={() => updatePreference("eventUpdates")} /></label><label className="preference-row"><span><strong>Quest reminders</strong><small>Progress tips and new campus challenges</small></span><input type="checkbox" checked={preferences.questReminders} onChange={() => updatePreference("questReminders")} /></label><button className="button button-secondary" type="button" onClick={() => notify("Your settings are saved on this device.", "success")}>Save preferences</button></div></Card>
        <Card className="settings-note"><span>ⓘ</span><p><strong>Demo app note</strong><br />Theme, profile, preferences, quests, and Lost & Found reports are stored in this browser only. No backend account or remote database is connected.</p></Card>
      </div>
    </>
  );
}
