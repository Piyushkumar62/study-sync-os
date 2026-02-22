export type Difficulty = "Easy" | "Medium" | "Hard";
export type Status = "Not Started" | "In Progress" | "Completed";

export interface TopicDetail {
  id: string;
  subjectId: string;
  moduleId: string;
  title: string;
  description: string;
  status: Status;
  estimatedMinutes: number;
  difficulty: Difficulty;
  progress: number;
  notes: string;
  resources: { label: string; url: string }[];
  lastUpdated: string;
}

export interface Subject {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  status: Status;
  estimatedMinutes: number;
  progress: number;
  topicIds: string[];
  lastUpdated: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  status: Status;
  estimatedMinutes: number;
  progress: number;
  subjectIds: string[];
  lastUpdated: string;
}

// ─── Topics ────────────────────────────────────────────────────

export const topics: Record<string, TopicDetail> = {
  // DBMS Topics
  "topic-dbms-er": {
    id: "topic-dbms-er",
    subjectId: "sub-dbms",
    moduleId: "mod-sem4",
    title: "ER Model",
    description: "Entity-Relationship diagrams, cardinality constraints, participation, weak entities, and conceptual schema design techniques.",
    status: "Completed",
    estimatedMinutes: 120,
    difficulty: "Easy",
    progress: 100,
    notes: "Focus on converting ER diagrams to relational schemas. Practice identifying primary keys and relationships from word problems.",
    resources: [
      { label: "ER Model – GeeksforGeeks", url: "#" },
      { label: "Navathe Ch. 3 Notes", url: "#" },
    ],
    lastUpdated: "2026-02-18",
  },
  "topic-dbms-relational": {
    id: "topic-dbms-relational",
    subjectId: "sub-dbms",
    moduleId: "mod-sem4",
    title: "Relational Model",
    description: "Relations, keys (candidate, super, foreign), relational algebra, tuple relational calculus, and domain relational calculus.",
    status: "Completed",
    estimatedMinutes: 150,
    difficulty: "Medium",
    progress: 100,
    notes: "Relational algebra operations: σ (select), π (project), ⋈ (join), ÷ (division). Practice converting SQL to relational algebra.",
    resources: [
      { label: "Relational Algebra Cheat Sheet", url: "#" },
      { label: "Practice Problems Set", url: "#" },
    ],
    lastUpdated: "2026-02-16",
  },
  "topic-dbms-normalization": {
    id: "topic-dbms-normalization",
    subjectId: "sub-dbms",
    moduleId: "mod-sem4",
    title: "Normalization",
    description: "Functional dependencies, 1NF through BCNF, 4NF, lossless-join decomposition, and dependency preservation.",
    status: "In Progress",
    estimatedMinutes: 180,
    difficulty: "Hard",
    progress: 55,
    notes: "Key insight: BCNF removes all redundancy from FDs but may sacrifice dependency preservation. 3NF is a good compromise.",
    resources: [
      { label: "Normalization Visualizer", url: "#" },
      { label: "FD Closure Calculator", url: "#" },
      { label: "GATE PYQs – Normalization", url: "#" },
    ],
    lastUpdated: "2026-02-20",
  },
  "topic-dbms-sql": {
    id: "topic-dbms-sql",
    subjectId: "sub-dbms",
    moduleId: "mod-sem4",
    title: "SQL",
    description: "DDL, DML, aggregate functions, nested subqueries, correlated subqueries, joins, views, triggers, and stored procedures.",
    status: "In Progress",
    estimatedMinutes: 150,
    difficulty: "Medium",
    progress: 40,
    notes: "Practice writing complex queries with GROUP BY + HAVING. Understand difference between WHERE and HAVING clauses.",
    resources: [
      { label: "SQLZoo Interactive", url: "#" },
      { label: "LeetCode SQL 50", url: "#" },
    ],
    lastUpdated: "2026-02-19",
  },
  "topic-dbms-transactions": {
    id: "topic-dbms-transactions",
    subjectId: "sub-dbms",
    moduleId: "mod-sem4",
    title: "Transactions",
    description: "ACID properties, serializability, conflict & view equivalence, two-phase locking, timestamp ordering, and recovery protocols.",
    status: "Not Started",
    estimatedMinutes: 150,
    difficulty: "Hard",
    progress: 0,
    notes: "",
    resources: [
      { label: "Transaction Concepts – Navathe Ch. 17", url: "#" },
    ],
    lastUpdated: "2026-02-10",
  },
  "topic-dbms-indexing": {
    id: "topic-dbms-indexing",
    subjectId: "sub-dbms",
    moduleId: "mod-sem4",
    title: "Indexing",
    description: "Primary, secondary, dense, sparse indexes. B-trees, B+ trees, hash-based indexing, and query optimization basics.",
    status: "Not Started",
    estimatedMinutes: 120,
    difficulty: "Medium",
    progress: 0,
    notes: "",
    resources: [
      { label: "B+ Tree Simulator", url: "#" },
    ],
    lastUpdated: "2026-02-10",
  },

  // OS Topics
  "topic-os-cpu": {
    id: "topic-os-cpu",
    subjectId: "sub-os",
    moduleId: "mod-sem4",
    title: "CPU Scheduling",
    description: "FCFS, SJF, SRTF, Round Robin, priority scheduling, multilevel queue, and multilevel feedback queue algorithms.",
    status: "Completed",
    estimatedMinutes: 150,
    difficulty: "Medium",
    progress: 100,
    notes: "Remember: SJF is optimal for average waiting time but requires knowing burst time in advance. RR performance depends on quantum size.",
    resources: [
      { label: "Scheduling Simulator", url: "#" },
      { label: "Galvin Ch. 5 Summary", url: "#" },
    ],
    lastUpdated: "2026-02-17",
  },
  "topic-os-deadlock": {
    id: "topic-os-deadlock",
    subjectId: "sub-os",
    moduleId: "mod-sem4",
    title: "Deadlock",
    description: "Necessary conditions, resource allocation graphs, deadlock detection, prevention, avoidance via Banker's algorithm.",
    status: "Completed",
    estimatedMinutes: 150,
    difficulty: "Hard",
    progress: 100,
    notes: "Banker's algorithm: check safe state by simulating allocation. Key: if a safe sequence exists, grant request. Practice RAG cycle detection.",
    resources: [
      { label: "Banker's Algorithm Solver", url: "#" },
      { label: "GATE PYQs – Deadlock", url: "#" },
    ],
    lastUpdated: "2026-02-15",
  },
  "topic-os-memory": {
    id: "topic-os-memory",
    subjectId: "sub-os",
    moduleId: "mod-sem4",
    title: "Memory Management",
    description: "Contiguous allocation, paging, segmentation, virtual memory, demand paging, page replacement algorithms, thrashing.",
    status: "Completed",
    estimatedMinutes: 180,
    difficulty: "Hard",
    progress: 100,
    notes: "LRU is optimal among online algorithms. Belady's anomaly occurs in FIFO but not in LRU or Optimal. Practice EAT calculations.",
    resources: [
      { label: "Page Replacement Visualizer", url: "#" },
      { label: "Virtual Memory Concepts", url: "#" },
    ],
    lastUpdated: "2026-02-14",
  },
  "topic-os-sync": {
    id: "topic-os-sync",
    subjectId: "sub-os",
    moduleId: "mod-sem4",
    title: "Synchronization",
    description: "Critical section problem, Peterson's solution, semaphores, monitors, producer-consumer, readers-writers, dining philosophers.",
    status: "In Progress",
    estimatedMinutes: 150,
    difficulty: "Hard",
    progress: 60,
    notes: "Binary semaphore = mutex. Counting semaphore for resource pools. Monitors encapsulate shared data with condition variables.",
    resources: [
      { label: "Synchronization Animations", url: "#" },
      { label: "Classical Problems Walkthrough", url: "#" },
    ],
    lastUpdated: "2026-02-20",
  },
  "topic-os-fs": {
    id: "topic-os-fs",
    subjectId: "sub-os",
    moduleId: "mod-sem4",
    title: "File System",
    description: "Directory structures, file allocation methods (contiguous, linked, indexed), free-space management, disk scheduling.",
    status: "Completed",
    estimatedMinutes: 120,
    difficulty: "Easy",
    progress: 100,
    notes: "Indexed allocation combines benefits of contiguous and linked. SCAN/C-SCAN are most commonly used disk scheduling algorithms.",
    resources: [
      { label: "Disk Scheduling Simulator", url: "#" },
    ],
    lastUpdated: "2026-02-13",
  },
};

// ─── Subjects ──────────────────────────────────────────────────

export const subjects: Record<string, Subject> = {
  "sub-dbms": {
    id: "sub-dbms",
    moduleId: "mod-sem4",
    title: "Database Management System",
    description: "Comprehensive study of database design, querying, normalization, transactions, and storage structures.",
    status: "In Progress",
    estimatedMinutes: 870,
    progress: 49,
    topicIds: [
      "topic-dbms-er", "topic-dbms-relational", "topic-dbms-normalization",
      "topic-dbms-sql", "topic-dbms-transactions", "topic-dbms-indexing",
    ],
    lastUpdated: "2026-02-20",
  },
  "sub-os": {
    id: "sub-os",
    moduleId: "mod-sem4",
    title: "Operating System",
    description: "Core OS concepts including process management, scheduling, memory, synchronization, and file systems.",
    status: "In Progress",
    estimatedMinutes: 750,
    progress: 88,
    topicIds: [
      "topic-os-cpu", "topic-os-deadlock", "topic-os-memory",
      "topic-os-sync", "topic-os-fs",
    ],
    lastUpdated: "2026-02-20",
  },
};

// ─── Modules ───────────────────────────────────────────────────

export const modules: Module[] = [
  {
    id: "mod-sem4",
    title: "Semester 4",
    description: "Core computer science subjects covering databases and operating systems fundamentals.",
    status: "In Progress",
    estimatedMinutes: 1620,
    progress: 66,
    subjectIds: ["sub-dbms", "sub-os"],
    lastUpdated: "2026-02-20",
  },
];

// ─── Helper functions ──────────────────────────────────────────

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getSubjectById(id: string): Subject | undefined {
  return subjects[id];
}

export function getTopicById(id: string): TopicDetail | undefined {
  return topics[id];
}

export function getSubjectsForModule(moduleId: string): Subject[] {
  const mod = getModuleById(moduleId);
  if (!mod) return [];
  return mod.subjectIds.map((id) => subjects[id]).filter(Boolean);
}

export function getTopicsForSubject(subjectId: string): TopicDetail[] {
  const sub = getSubjectById(subjectId);
  if (!sub) return [];
  return sub.topicIds.map((id) => topics[id]).filter(Boolean);
}

export function formatMinutes(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
