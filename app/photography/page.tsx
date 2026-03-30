import { photographyProjects } from "@/lib/projects"
import SectionLayout from "@/components/section-layout"
import ProjectSection from "@/components/project-section"

export const metadata = {
  title: "Photography | Inigo Paolo",
  description: "Photography portfolio featuring automotive and model photography",
}

export default function PhotographyPage() {
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
              Photography
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
            A collection of automotive and portrait photography, exploring light, composition, and creative direction.
          </p>
        </div>
      </div>

      {/* Project sections */}
      <div>
        {photographyProjects.map((project, index) => (
          <ProjectSection 
            key={project.slug} 
            project={project} 
            index={index}
            categoryLabel="Photography"
          />
        ))}
      </div>
    </SectionLayout>
  )
}
