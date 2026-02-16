import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does StudySync differ from a regular note-taking app?",
    a: "StudySync isn't a note-taking tool — it's a study operations system. You bring your existing materials, and StudySync organizes them into modules, tracks your study behavior over time, detects gaps, and provides AI-powered recommendations on what to study next.",
  },
  {
    q: "Do I need to manually log study sessions?",
    a: "You can, but it's optional. StudySync uses lightweight session tracking to automatically capture when and how long you study each module. You can also adjust logs manually for offline study time.",
  },
  {
    q: "Is my data private and secure?",
    a: "Yes. All data is encrypted at rest and in transit. We never share or sell your academic data. Campus plans include SSO and full admin controls for institutional compliance.",
  },
  {
    q: "Can I use StudySync for group study?",
    a: "The Campus plan includes shared modules, team dashboards, and collaborative features. Free and Pro plans are designed for individual students.",
  },
  {
    q: "What file formats are supported?",
    a: "StudySync supports PDF, DOCX, PPTX, Markdown, and plain text. We're actively adding support for image-based notes and handwritten uploads.",
  },
];

export function FAQSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/40">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Frequently asked questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border bg-card px-5 shadow-card"
            >
              <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
