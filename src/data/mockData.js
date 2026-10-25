export const initialStudent = {
  name: "Aarav Mehta",
  email: "aarav@campusquest.edu",
  branch: "Computer Science",
  semester: "5",
  bio: "Curious builder, campus explorer, and lifelong learner.",
  avatar: "AM",
};

export const events = [
  { id: "e1", title: "Campus Innovation Hackathon", category: "Technology", date: "2026-11-07", time: "10:00 AM", venue: "Innovation Hub", organizer: "Innovation Cell", description: "Build practical solutions for campus life in a day-long team challenge.", emoji: "💡" },
  { id: "e2", title: "AI & Machine Learning Workshop", category: "Workshop", date: "2026-11-12", time: "11:00 AM", venue: "Seminar Hall", organizer: "AI Club", description: "Explore machine-learning fundamentals through guided, hands-on activities.", emoji: "🤖" },
  { id: "e3", title: "Autumn Music Evening", category: "Culture", date: "2026-11-16", time: "06:00 PM", venue: "Central Lawn", organizer: "Cultural Society", description: "An evening of student performances, food stalls, and campus community.", emoji: "🎸" },
  { id: "e4", title: "CSS Department Tech Meet", category: "Community", date: "2026-11-20", time: "12:00 PM", venue: "Block A", organizer: "Computer Science Department", description: "Meet students and faculty, and hear about upcoming projects and opportunities.", emoji: "🧑‍💻" },
  { id: "e5", title: "Inter-college Basketball", category: "Sports", date: "2026-11-25", time: "04:30 PM", venue: "Sports Arena", organizer: "Athletics Council", description: "Cheer on campus teams in the inter-college basketball series.", emoji: "🏀" },
];

export const companies = [
  { id: "c1", name: "Northstar Labs", sector: "Software", visitDate: "2026-11-18", roles: "Frontend Engineer Intern", eligibility: "CS / IT · 7.0 CGPA", package: "Internship · 12 weeks", emoji: "🌌", description: "A product engineering studio building tools for modern teams. Meet the engineering team and learn about internship projects." },
  { id: "c2", name: "GreenGrid Energy", sector: "Clean technology", visitDate: "2026-11-22", roles: "Data Analyst Intern", eligibility: "All branches · 6.5 CGPA", package: "Internship · 10 weeks", emoji: "🌱", description: "GreenGrid develops data-driven solutions for more efficient energy systems and sustainable cities." },
  { id: "c3", name: "Pixel & Form", sector: "Design", visitDate: "2026-12-02", roles: "Product Design Intern", eligibility: "Design / CS · Portfolio", package: "Internship · 8 weeks", emoji: "🎨", description: "A collaborative digital product agency focused on accessible, human-centered experiences." },
  { id: "c4", name: "Orbit Finance", sector: "Fintech", visitDate: "2026-12-08", roles: "Software Engineering Intern", eligibility: "CS / Mathematics · 7.5 CGPA", package: "Internship · 12 weeks", emoji: "🪐", description: "Orbit builds secure financial tools and offers students a chance to learn from its platform team." },
];

export const subjects = [
  { code: "CS301", name: "Data Structures & Algorithms", instructor: "Prof. Sharma", credits: 4, progress: 72, grade: "A" },
  { code: "CS305", name: "Database Management Systems", instructor: "Prof. Singh", credits: 4, progress: 64, grade: "A-" },
  { code: "CS309", name: "Web Application Engineering", instructor: "Prof. Kumar", credits: 3, progress: 81, grade: "A" },
  { code: "CS311", name: "Operating Systems", instructor: "Prof. Iyer", credits: 4, progress: 57, grade: "B+" },
  { code: "MA203", name: "Discrete Mathematics", instructor: "Prof. Rao", credits: 3, progress: 68, grade: "A-" },
];

export const timetable = {
  Monday: [["09:00", "Data Structures", "Room 204"], ["11:00", "Database Systems", "Lab 3"], ["14:00", "Web Engineering", "Room 105"]],
  Tuesday: [["09:00", "Operating Systems", "Room 201"], ["11:00", "Discrete Mathematics", "Room 108"], ["14:00", "Project Studio", "Innovation Lab"]],
  Wednesday: [["09:00", "Database Systems", "Room 203"], ["11:00", "Data Structures", "Lab 1"], ["14:00", "Web Engineering", "Room 105"]],
  Thursday: [["09:00", "Discrete Mathematics", "Room 108"], ["11:00", "Operating Systems", "Lab 4"], ["14:00", "Faculty Office Hours", "Block C"]],
  Friday: [["09:00", "Data Structures", "Room 204"], ["11:00", "Project Studio", "Innovation Lab"], ["14:00", "Computer Networks", "Room 109"]],
};

export const initialQuests = [
  { id: "q1", title: "Complete your profile", description: "Add a short bio and your study details.", category: "Campus", xp: 100, completed: false },
  { id: "q2", title: "Focus session", description: "Spend 45 minutes on one academic goal.", category: "Academic", xp: 150, completed: false },
  { id: "q3", title: "Meet a new classmate", description: "Introduce yourself to someone in your course.", category: "Community", xp: 100, completed: false },
  { id: "q4", title: "Explore the library", description: "Find a new study spot or resource on campus.", category: "Academic", xp: 120, completed: false },
  { id: "q5", title: "Join a campus event", description: "Register for an event that interests you.", category: "Community", xp: 130, completed: false },
  { id: "q6", title: "Help a fellow student", description: "Share a useful resource or lend a hand.", category: "Community", xp: 150, completed: false },
];

export const initialReports = [
  { id: "r1", title: "Blue water bottle", status: "Lost", category: "Accessories", description: "Matte blue steel bottle, initials A.M. on the base.", date: "2026-10-22", location: "Library, second floor", contact: "library desk" },
  { id: "r2", title: "Found: calculator", status: "Found", category: "Electronics", description: "Scientific calculator left in the east lecture hall.", date: "2026-10-21", location: "East Lecture Hall", contact: "student services" },
  { id: "r3", title: "Green notebook", status: "Lost", category: "Books", description: "Spiral notebook with a green cover and lecture notes inside.", date: "2026-10-19", location: "Cafeteria", contact: "campusquest@campus.edu" },
  { id: "r4", title: "Found: key ring", status: "Found", category: "Accessories", description: "Three keys on a yellow fabric keychain.", date: "2026-10-18", location: "North Gate", contact: "security desk" },
  { id: "r5", title: "Wireless earbuds case", status: "Lost", category: "Electronics", description: "Small white charging case, no earbuds inside.", date: "2026-10-16", location: "Sports Arena", contact: "campusquest@campus.edu" },
  { id: "r6", title: "Found: art portfolio", status: "Found", category: "Other", description: "Black zip portfolio with sketch paper.", date: "2026-10-15", location: "Arts Building", contact: "arts office" },
  { id: "r7", title: "Red campus lanyard", status: "Lost", category: "Accessories", description: "Red lanyard with a student card sleeve.", date: "2026-10-14", location: "Bus stop", contact: "campusquest@campus.edu" },
];

export const leaderboardStudents = [
  { name: "Maya Chen", branch: "Information Technology", xp: 1420, avatar: "MC" },
  { name: "Ishaan Kapoor", branch: "Computer Science", xp: 1280, avatar: "IK" },
  { name: "Zoya Khan", branch: "Electrical Engineering", xp: 1160, avatar: "ZK" },
  { name: "Dev Patel", branch: "Computer Science", xp: 980, avatar: "DP" },
  { name: "Anaya Das", branch: "Design", xp: 850, avatar: "AD" },
];
