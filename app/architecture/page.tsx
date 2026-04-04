import SectionLayout from "@/components/section-layout"
import ArchitecturePortfolio from "@/components/architecture-portfolio"

export const metadata = {
  title: "Architecture | Inigo Paolo",
  description: "Architecture portfolio showcasing design projects and concepts.",
}

export default function ArchitecturePage() {
  return (
    <SectionLayout>
      <ArchitecturePortfolio />
    </SectionLayout>
  )
}
