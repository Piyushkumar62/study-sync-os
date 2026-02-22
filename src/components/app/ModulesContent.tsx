import { useState } from "react";
import {
  BookOpen, Clock, ChevronRight, CheckCircle2, Circle, Loader2,
  ArrowLeft, FileText, Link as LinkIcon, StickyNote, BarChart3
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  modules, subjects, topics,
  getSubjectsForModule, getTopicsForSubject, getTopicById,
  formatMinutes,
  type Module, type Subject, type TopicDetail, type Status, type Difficulty,
} from "@/data/studyData";

/* ── Status helpers ─────────────────────────────────────── */

const statusIcon = (s: Status) => {
  switch (s) {
    case "Completed": return <CheckCircle2 size={16} className="text-primary shrink-0" />;
    case "In Progress": return <Loader2 size={16} className="text-accent-foreground shrink-0" />;
    case "Not Started": return <Circle size={16} className="text-muted-foreground shrink-0" />;
  }
};

const statusPill = (s: Status) => {
  const base = "text-[10px] font-semibold px-2.5 py-0.5 rounded-full";
  switch (s) {
    case "Completed": return `${base} bg-primary/10 text-primary`;
    case "In Progress": return `${base} bg-accent text-accent-foreground`;
    case "Not Started": return `${base} bg-secondary text-muted-foreground`;
  }
};

const diffVariant = (d: Difficulty): "secondary" | "default" | "destructive" => {
  switch (d) {
    case "Easy": return "secondary";
    case "Medium": return "default";
    case "Hard": return "destructive";
  }
};

/* ── Breadcrumb ─────────────────────────────────────────── */

function Breadcrumb({ items, onNavigate }: { items: { label: string; onClick?: () => void }[]; onNavigate?: () => void }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={12} />}
          {item.onClick ? (
            <button onClick={item.onClick} className="hover:text-foreground transition-colors underline-offset-2 hover:underline">
              {item.label}
            </button>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

/* ── Level 1: Modules List ──────────────────────────────── */

function ModulesList({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Modules</h1>
        <p className="text-sm text-muted-foreground">Select a module to view its subjects and topics.</p>
      </div>
      <div className="grid gap-4">
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => onSelect(mod.id)}
            className="w-full text-left rounded-xl border border-border bg-card p-5 shadow-card hover:border-primary/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{mod.title}</h3>
                  <p className="text-xs text-muted-foreground">{mod.description}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors mt-1" />
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span>{mod.subjectIds.length} subjects</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {formatMinutes(mod.estimatedMinutes)}</span>
              <span className={statusPill(mod.status)}>{mod.status}</span>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={mod.progress} className="h-1.5 flex-1" />
              <span className="text-xs font-medium text-foreground">{mod.progress}%</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Level 2: Subjects List ─────────────────────────────── */

function SubjectsList({ moduleId, onSelect, onBack }: { moduleId: string; onSelect: (id: string) => void; onBack: () => void }) {
  const mod = modules.find((m) => m.id === moduleId)!;
  const subs = getSubjectsForModule(moduleId);

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Modules", onClick: onBack },
          { label: mod.title },
        ]}
      />
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{mod.title}</h1>
          <p className="text-sm text-muted-foreground">{subs.length} subjects · {formatMinutes(mod.estimatedMinutes)} total</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {subs.map((sub) => (
          <button
            key={sub.id}
            onClick={() => onSelect(sub.id)}
            className="w-full text-left rounded-xl border border-border bg-card p-5 shadow-card hover:border-primary/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText size={18} className="text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{sub.title}</h3>
              </div>
              <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors mt-1" />
            </div>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{sub.description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span>{sub.topicIds.length} topics</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {formatMinutes(sub.estimatedMinutes)}</span>
              <span className={statusPill(sub.status)}>{sub.status}</span>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={sub.progress} className="h-1.5 flex-1" />
              <span className="text-xs font-medium text-foreground">{sub.progress}%</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Level 3: Topics List ───────────────────────────────── */

function TopicsList({ subjectId, onSelect, onBack, onBackToModules }: {
  subjectId: string; onSelect: (id: string) => void; onBack: () => void; onBackToModules: () => void;
}) {
  const sub = subjects[subjectId]!;
  const mod = modules.find((m) => m.id === sub.moduleId)!;
  const topicList = getTopicsForSubject(subjectId);

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Modules", onClick: onBackToModules },
          { label: mod.title, onClick: onBack },
          { label: sub.title },
        ]}
      />
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{sub.title}</h1>
          <p className="text-sm text-muted-foreground">{topicList.length} topics · {formatMinutes(sub.estimatedMinutes)} total · {sub.progress}% complete</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        {topicList.map((topic, i) => (
          <button
            key={topic.id}
            onClick={() => onSelect(topic.id)}
            className={`w-full text-left flex items-center gap-4 px-5 py-4 hover:bg-secondary/20 transition-colors group ${
              i < topicList.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="mt-0.5">{statusIcon(topic.status)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{topic.title}</span>
                <Badge variant={diffVariant(topic.difficulty)} className="text-[10px] px-2 py-0">
                  {topic.difficulty}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{topic.description}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock size={12} /> {formatMinutes(topic.estimatedMinutes)}
              </span>
              <div className="flex items-center gap-2 w-20">
                <Progress value={topic.progress} className="h-1 flex-1" />
                <span className="text-[10px] text-muted-foreground w-7 text-right">{topic.progress}%</span>
              </div>
              <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Topic Detail View ──────────────────────────────────── */

function TopicDetailView({ topicId, onBack, onBackToSubjects, onBackToModules }: {
  topicId: string; onBack: () => void; onBackToSubjects: () => void; onBackToModules: () => void;
}) {
  const topic = getTopicById(topicId)!;
  const sub = subjects[topic.subjectId]!;
  const mod = modules.find((m) => m.id === topic.moduleId)!;

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Modules", onClick: onBackToModules },
          { label: mod.title, onClick: onBackToSubjects },
          { label: sub.title, onClick: onBack },
          { label: topic.title },
        ]}
      />
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-foreground">{topic.title}</h1>
            <Badge variant={diffVariant(topic.difficulty)}>{topic.difficulty}</Badge>
            <span className={statusPill(topic.status)}>{topic.status}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{sub.title} · {mod.title}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: BarChart3, label: "Progress", value: `${topic.progress}%` },
          { icon: Clock, label: "Est. Time", value: formatMinutes(topic.estimatedMinutes) },
          { icon: FileText, label: "Difficulty", value: topic.difficulty },
          { icon: Clock, label: "Last Updated", value: topic.lastUpdated },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 mb-1">
              <stat.icon size={14} className="text-muted-foreground" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</span>
            </div>
            <div className="text-lg font-bold text-foreground">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h3 className="text-sm font-semibold text-foreground mb-3">Completion</h3>
        <div className="flex items-center gap-4">
          <Progress value={topic.progress} className="h-2 flex-1" />
          <span className="text-sm font-semibold text-foreground">{topic.progress}%</span>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{topic.description}</p>
      </div>

      {/* Notes */}
      {topic.notes && (
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <StickyNote size={16} className="text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Notes</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{topic.notes}</p>
        </div>
      )}

      {/* Resources */}
      {topic.resources.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <LinkIcon size={16} className="text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
          </div>
          <div className="space-y-2">
            {topic.resources.map((res, i) => (
              <a
                key={i}
                href={res.url}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ChevronRight size={12} />
                {res.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────── */

type View =
  | { level: "modules" }
  | { level: "subjects"; moduleId: string }
  | { level: "topics"; moduleId: string; subjectId: string }
  | { level: "detail"; moduleId: string; subjectId: string; topicId: string };

export function ModulesContent() {
  const [view, setView] = useState<View>({ level: "modules" });

  switch (view.level) {
    case "modules":
      return <ModulesList onSelect={(id) => setView({ level: "subjects", moduleId: id })} />;
    case "subjects":
      return (
        <SubjectsList
          moduleId={view.moduleId}
          onSelect={(id) => setView({ level: "topics", moduleId: view.moduleId, subjectId: id })}
          onBack={() => setView({ level: "modules" })}
        />
      );
    case "topics":
      return (
        <TopicsList
          subjectId={view.subjectId}
          onSelect={(id) => setView({ level: "detail", moduleId: view.moduleId, subjectId: view.subjectId, topicId: id })}
          onBack={() => setView({ level: "subjects", moduleId: view.moduleId })}
          onBackToModules={() => setView({ level: "modules" })}
        />
      );
    case "detail":
      return (
        <TopicDetailView
          topicId={view.topicId}
          onBack={() => setView({ level: "topics", moduleId: view.moduleId, subjectId: view.subjectId })}
          onBackToSubjects={() => setView({ level: "subjects", moduleId: view.moduleId })}
          onBackToModules={() => setView({ level: "modules" })}
        />
      );
  }
}
