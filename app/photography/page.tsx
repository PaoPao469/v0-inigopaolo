import SectionLayout from "@/components/section-layout"
import SlimeCursor from "@/components/slime-cursor"
import PhotographyPortfolio from "@/components/photography-portfolio"

export const metadata = {
  title: "Photography | Inigo Paolo",
  description: "Photography portfolio featuring automotive and model photography",
}

export default function PhotographyPage() {
  return (
    <>
      <SlimeCursor />
      <SectionLayout>
        <PhotographyPortfolio />
      </SectionLayout>
    </>
  )
}
