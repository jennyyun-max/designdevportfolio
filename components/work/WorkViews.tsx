"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/types";
import ProjectTile from "./ProjectTile";
import ProjectIndex from "./ProjectIndex";

/* Where each plate sits on the 12-column grid — a rhythm of full, offset and paired plates */
const LAYOUT: { cls: string; shape: "full" | "wide" | "tall" }[] = [
  { cls: "md:col-span-12", shape: "full" },
  { cls: "md:col-span-7", shape: "wide" },
  { cls: "md:col-span-4 md:col-start-9 md:mt-[24%]", shape: "tall" },
  { cls: "md:col-span-5 md:col-start-2", shape: "tall" },
  { cls: "md:col-span-6 md:col-start-7 md:mt-[34%]", shape: "wide" },
  { cls: "md:col-span-8 md:col-start-3", shape: "wide" },
];

/* The work, two ways: large plates (default) or a compact index. The choice is remembered. */
export default function WorkViews({ projects }: { projects: Project[] }) {
  const [view, setView] = useState<"plates" | "index">("plates");
  useEffect(() => {
    try {
      if (localStorage.getItem("work-view") === "index") setView("index");
    } catch {}
  }, []);
  const choose = (v: "plates" | "index") => {
    setView(v);
    try {
      localStorage.setItem("work-view", v);
    } catch {}
  };

  return (
    <div>
      <div className="meta flex items-center justify-between border-b border-ink pb-3">
        <span className="text-muted">{String(projects.length).padStart(2, "0")} projects</span>
        <div role="group" aria-label="View" className="flex gap-4">
          {(["plates", "index"] as const).map((v) => (
            <button key={v} type="button" aria-pressed={view === v} onClick={() => choose(v)} className={`wipe ${view === v ? "text-ink" : "text-muted"}`}>
              {v === "plates" ? "Plates" : "Index"}
            </button>
          ))}
        </div>
      </div>

      {view === "plates" ? (
        <ul className="mt-12 grid gap-x-8 gap-y-24 md:grid-cols-12 md:gap-y-32">
          {projects.map((p, i) => {
            const l = LAYOUT[i % LAYOUT.length];
            return (
              <li key={p.slug} className={l.cls}>
                <ProjectTile project={p} n={i + 1} shape={l.shape} priority={i === 0} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-12">
          <ProjectIndex projects={projects} />
        </div>
      )}
    </div>
  );
}
