import SectionLayout from "@/components/section-layout"
import SlimeCursor from "@/components/slime-cursor"
import ClothingPortfolio from "@/components/clothing-portfolio"

export const metadata = {
  title: "Clothing | Inigo Paolo",
  description: "Clothing brand and fashion design portfolio",
}

export default function ClothingPage() {
  return (
    <>
      <SlimeCursor />
      <SectionLayout>
        <ClothingPortfolio />
      </SectionLayout>
    </>
  )
}
