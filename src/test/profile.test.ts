import { describe, expect, it } from "vitest";
import { filterProjects, profile, projectFormats, projects, skillCategories, skills } from "@/data/profile";

describe("Student application portfolio rules", () => {
  it("organizes expertise into the requested three areas", () => {
    expect([...skillCategories]).toEqual(["商業分析", "程式作品", "業餘興趣"]);
    expect(new Set(skills.map((s) => s.category))).toEqual(new Set(skillCategories));
  });
  it("covers both art and sport under hobbies", () => {
    const tags = skills.filter((s) => s.category === "業餘興趣").flatMap((s) => s.tags);
    expect(tags).toContain("藝術");
    expect(tags).toContain("運動");
  });
  it("supports website and PPT work as distinct filters", () => {
    expect([...projectFormats]).toEqual(["網站", "PPT"]);
    expect(filterProjects("全部")).toHaveLength(projects.length);
    for (const format of projectFormats) {
      const matching = filterProjects(format);
      expect(matching.length).toBeGreaterThan(0);
      expect(matching.every((p) => p.format === format)).toBe(true);
    }
  });
  it("identifies current enrollment and both application goals", () => {
    expect(profile.roles).toContain("在學學生");
    expect(profile.status).toContain("求職");
    expect(profile.status).toContain("研究所");
  });
});
