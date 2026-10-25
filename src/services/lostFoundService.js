import { initialReports } from "../data/mockData";

const STORAGE_KEY = "campusquest-react-lost-found";
const wait = () => new Promise((resolve) => setTimeout(resolve, 180));

function readReports() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === null) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialReports));
    return initialReports;
  }
  const reports = JSON.parse(stored);
  if (!Array.isArray(reports)) throw new Error("Saved Lost & Found data is not a report list.");
  return reports;
}

function writeReports(reports) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export async function getReports() {
  await wait();
  try {
    return readReports();
  } catch (error) {
    throw new Error(`Unable to load Lost & Found reports: ${error.message}`);
  }
}

export async function saveReport(report) {
  await wait();
  try {
    const reports = readReports();
    const exists = reports.some((item) => item.id === report.id);
    const updated = exists ? reports.map((item) => item.id === report.id ? report : item) : [report, ...reports];
    writeReports(updated);
    return updated;
  } catch (error) {
    throw new Error(`Unable to save the report: ${error.message}`);
  }
}

export async function removeReport(id) {
  await wait();
  try {
    const updated = readReports().filter((item) => item.id !== id);
    writeReports(updated);
    return updated;
  } catch (error) {
    throw new Error(`Unable to delete the report: ${error.message}`);
  }
}
