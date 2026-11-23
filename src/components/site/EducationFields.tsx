import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { profile } from "@/data/profile";

export function EducationFields() {
  const [values, setValues] = useState({ school: "", department: "", year: "" });
  return (
    <section className="mx-auto max-w-6xl px-5 py-12" aria-labelledby="education-heading">
      <h2 id="education-heading" className="flex items-center gap-3 text-2xl font-bold"><GraduationCap />在學資料</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {profile.educationFields.map((field) => (
          <label key={field.key} className="flex min-w-0 flex-col gap-2 text-sm font-semibold">
            {field.label}
            <input value={values[field.key]} onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))} placeholder={field.placeholder} className="h-12 w-full rounded-lg border border-ink bg-card px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </label>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{profile.educationDraftNote}</p>
    </section>
  );
}