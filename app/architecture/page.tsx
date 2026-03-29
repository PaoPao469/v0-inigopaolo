import SectionLayout from "@/components/section-layout"
import ProjectGallery from "@/components/project-gallery"
import { architectureProjects } from "@/lib/projects"

export const metadata = {
  title: "Architecture | Inigo Paolo",
  description: "Architecture portfolio showcasing design projects and concepts.",
}

export default function ArchitecturePage() {
  return (
    <SectionLayout>
      {/* Section header */}
      <div className="mb-12">
        <h1
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            letterSpacing: "0.28em",
            fontSize: "34px",
            color: "rgba(180, 175, 165, 0.82)",
            textTransform: "uppercase",
          }}
        >
          ARCHITECTURE
        </h1>
        <p
          className="mt-4 max-w-2xl"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            letterSpacing: "0.04em",
            fontSize: "13px",
            color: "rgba(180, 175, 165, 0.55)",
            lineHeight: 1.7,
          }}
        >
          A collection of architectural projects exploring form, space, and materiality.
        </p>
      </div>

      {/* Project grid */}
      <ProjectGallery projects={architectureProjects} />
    </SectionLayout>
  )
}
