import { photographyProjects } from "@/lib/projects"
import SectionLayout from "@/components/section-layout"
import ProjectGallery from "@/components/project-gallery"
import BackButton from "@/components/back-button"
import SlimeCursor from "@/components/slime-cursor"

export const metadata = {
  title: "Photography | Inigo Paolo",
  description: "Photography portfolio featuring automotive and model photography",
}

export default function PhotographyPage() {
  return (
    <>
      <SlimeCursor />
      <SectionLayout>
        <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
          <BackButton href="/" label="Home" />
          
          <header className="mb-16">
            <h1
              className="mb-4"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "0.12em",
                color: "rgba(180, 175, 165, 0.82)",
                textTransform: "uppercase",
              }}
            >
              Photography
            </h1>
            <p
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(180, 175, 165, 0.6)",
                maxWidth: "600px",
                lineHeight: 1.6,
              }}
            >
              A collection of automotive and portrait photography, exploring light, composition, and creative direction.
            </p>
          </header>

          <ProjectGallery projects={photographyProjects} section="photography" />
        </div>
      </SectionLayout>
    </>
  )
}
