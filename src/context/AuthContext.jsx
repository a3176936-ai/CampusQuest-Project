import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialStudent } from "../data/mockData";

const AuthContext = createContext(null);
const STORAGE_KEY = "campusquest-react-student";

function readStudent() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Could not read the saved student profile.", error);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(readStudent);

  useEffect(() => {
    if (student) localStorage.setItem(STORAGE_KEY, JSON.stringify(student));
    else localStorage.removeItem(STORAGE_KEY);
  }, [student]);

  const value = useMemo(() => ({
    student,
    isAuthenticated: Boolean(student),
    login(email) {
      const normalizedEmail = email.trim().toLowerCase();
      setStudent((current) => ({
        ...(current || initialStudent),
        email: normalizedEmail,
        name: current?.email === normalizedEmail ? current.name : initialStudent.name,
      }));
    },
    register(details) {
      setStudent({ ...initialStudent, ...details, email: details.email.trim().toLowerCase() });
    },
    updateProfile(updates) {
      setStudent((current) => current ? { ...current, ...updates } : current);
    },
    logout() {
      setStudent(null);
    },
  }), [student]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider.");
  return context;
}
