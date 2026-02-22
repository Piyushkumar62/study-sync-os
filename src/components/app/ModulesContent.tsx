import { useState } from "react";
import { BookOpen, Clock, ChevronDown, ChevronRight, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type Difficulty = "Easy" | "Medium" | "Hard";
type TopicStatus = "Not Started" | "In Progress" | "Completed";
type ModuleStatus = "Not Started" | "In Progress" | "Completed";

interface Topic {
  name: string;
  description: string;
  estimatedTime: string;
  status: TopicStatus;
  difficulty: Difficulty;
}

interface Module {
  name: string;
  topics: Topic[];
  completionPercentage: number;
  estimatedStudyTime: string;
  status: ModuleStatus;
}

const modules: Module[] = [
  {
    name: "Database Management System",
    estimatedStudyTime: "18 hours",
    completionPercentage: 62,
    status: "In Progress",
    topics: [
      { name: "ER Model", description: "Entity-Relationship diagrams, cardinality, participation constraints, and conceptual schema design.", estimatedTime: "3 hrs", status: "Completed", difficulty: "Easy" },
      { name: "Relational Model", description: "Relations, keys, relational algebra, tuple & domain relational calculus.", estimatedTime: "3 hrs", status: "Completed", difficulty: "Medium" },
      { name: "Normalization", description: "Functional dependencies, 1NF through BCNF, decomposition, and lossless joins.", estimatedTime: "4 hrs", status: "In Progress", difficulty: "Hard" },
      { name: "SQL", description: "DDL, DML, aggregate functions, joins, subqueries, views, and stored procedures.", estimatedTime: "3 hrs", status: "In Progress", difficulty: "Medium" },
      { name: "Transactions", description: "ACID properties, serializability, concurrency control protocols, and recovery.", estimatedTime: "3 hrs", status: "Not Started", difficulty: "Hard" },
      { name: "Indexing", description: "B/B+ trees, hashing, primary & secondary indexes, and query optimization basics.", estimatedTime: "2 hrs", status: "Not Started", difficulty: "Medium" },
    ],
  },
  {
    name: "Operating System",
    estimatedStudyTime: "20 hours",
    completionPercentage: 85,
    status: "In Progress",
    topics: [
      { name: "Process Management", description: "Process lifecycle, PCB, process states, IPC mechanisms, and context switching.", estimatedTime: "3.5 hrs", status: "Completed", difficulty: "Medium" },
      { name: "CPU Scheduling", description: "FCFS, SJF, Round Robin, priority scheduling, and multilevel queue algorithms.", estimatedTime: "3 hrs", status: "Completed", difficulty: "Medium" },
      { name: "Deadlock", description: "Conditions, resource allocation graphs, detection, prevention, avoidance (Banker's algorithm).", estimatedTime: "3.5 hrs", status: "Completed", difficulty: "Hard" },
      { name: "Memory Management", description: "Paging, segmentation, virtual memory, page replacement algorithms, and thrashing.", estimatedTime: "4 hrs", status: "Completed", difficulty: "Hard" },
      { name: "File System", description: "Directory structures, allocation methods, free-space management, and disk scheduling.", estimatedTime: "3 hrs", status: "Completed", difficulty: "Easy" },
      { name: "Synchronization", description: "Critical section, semaphores, monitors, classical problems (producer-consumer, readers-writers).", estimatedTime: "3 hrs", status: "Not Started", difficulty: "Hard" },
    ],
  },
];

const statusIcon = (status: TopicStatus) => {
  switch (status) {
    case "Completed": return <CheckCircle2 size={16} className="text-primary shrink-0" />;
    case "In Progress": return <Loader2 size={16} className="text-accent-foreground shrink-0" />;
    case "Not Started": return <Circle size={16} className="text-muted-foreground shrink-0" />;
  }
};

const difficultyVariant = (d: Difficulty) => {
  switch (d) {
    case "Easy": return "secondary" as const;
    case "Medium": return "default" as const;
    case "Hard": return "destructive" as const;
  }
};

const moduleStatusColor = (s: ModuleStatus) => {
  switch (s) {
    case "Completed": return "bg-primary/10 text-primary";
    case "In Progress": return "bg-accent text-accent-foreground";
    case "Not Started": return "bg-secondary text-muted-foreground";
  }
};

export function ModulesContent() {
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(
    Object.fromEntries(modules.map((m) => [m.name, true]))
  );

  const toggle = (name: string) =>
    setOpenModules((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Modules</h1>
        <p className="text-sm text-muted-foreground">Your academic modules and their structured topics.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {modules.map((mod) => (
          <div key={mod.name} className="rounded-xl border border-border bg-card p-5 shadow-card flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-primary" />
                <h3 className="text-sm font-semibold text-foreground">{mod.name}</h3>
              </div>
              <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${moduleStatusColor(mod.status)}`}>
                {mod.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{mod.topics.length} topics</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {mod.estimatedStudyTime}</span>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={mod.completionPercentage} className="h-1.5 flex-1" />
              <span className="text-xs font-medium text-foreground">{mod.completionPercentage}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed module sections */}
      {modules.map((mod) => (
        <Collapsible
          key={mod.name}
          open={openModules[mod.name]}
          onOpenChange={() => toggle(mod.name)}
        >
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/20 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                {openModules[mod.name] ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronRight size={16} className="text-muted-foreground" />}
                <BookOpen size={18} className="text-primary" />
                <h3 className="text-sm font-semibold text-foreground">{mod.name}</h3>
                <span className="text-xs text-muted-foreground">({mod.topics.length} topics)</span>
              </div>
              <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${moduleStatusColor(mod.status)}`}>
                {mod.status}
              </span>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="border-t border-border">
                {mod.topics.map((topic, i) => (
                  <div
                    key={topic.name}
                    className={`flex items-start gap-4 px-5 py-4 ${
                      i < mod.topics.length - 1 ? "border-b border-border" : ""
                    } hover:bg-secondary/10 transition-colors`}
                  >
                    <div className="mt-0.5">{statusIcon(topic.status)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-foreground">{topic.name}</span>
                        <Badge variant={difficultyVariant(topic.difficulty)} className="text-[10px] px-2 py-0">
                          {topic.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{topic.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={12} /> {topic.estimatedTime}
                      </span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        topic.status === "Completed"
                          ? "bg-primary/10 text-primary"
                          : topic.status === "In Progress"
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        {topic.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}
    </div>
  );
}
