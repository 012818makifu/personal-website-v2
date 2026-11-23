import { GraduationCap } from "lucide-react";
import { profile } from "@/data/profile";

export function EducationFields() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12" aria-labelledby="education-heading">
      <h2 id="education-heading" className="flex items-center gap-3 text-2xl font-bold">
        <GraduationCap />
        在學資料
      </h2>

      <dl className="mt-5 grid gap-5 sm:grid-cols-3">
        {profile.educationFields.map((field) => (
          <div key={field.label} className="rounded-lg border border-ink bg-card px-4 py-3">
            <dt className="text-sm text-muted-foreground">{field.label}</dt>
            <dd className="mt-1 text-lg font-semibold">{field.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}