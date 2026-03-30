import SectionLayout from "@/components/section-layout"
import ProjectSection from "@/components/project-section"
import { architectureProjects } from "@/lib/projects"

export const metadata = {
  title: "Architecture | Inigo Paolo",
  description: "Architecture portfolio showcasing design projects and concepts.",
}

export default function ArchitecturePage() {
  return (
    <SectionLayout>
      {/* Section header */}
      <div className="mb-8 pb-8 border-b border-white/5">
        <div className="flex items-end justify-between">
          <div>
            <p
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 500,
                letterSpacing: "0.15em",
                fontSize: "10px",
                color: "rgba(180, 175, 165, 0.4)",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Portfolio
            </p>
            <h1
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 400,
                letterSpacing: "0.02em",
                fontSize: "42px",
                color: "rgba(180, 175, 165, 0.9)",
              }}
            >
              Architecture
            </h1>
          </div>
          <p
            className="max-w-sm text-right hidden md:block"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontWeight: 400,
              letterSpacing: "0.02em",
              fontSize: "12px",
              color: "rgba(180, 175, 165, 0.45)",
              lineHeight: 1.7,
            }}
          >
            A collection of architectural projects exploring form, space, and materiality through academic work.
          </p>
        </div>
      </div>

      {/* Project sections */}
      <div>
        {architectureProjects.map((project, index) => (
          <ProjectSection 
            key={project.slug} 
            project={project} 
            index={index}
            categoryLabel="Architecture"
          />
        ))}
      </div>
    </SectionLayout>
  )
}
