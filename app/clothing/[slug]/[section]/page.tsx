import { notFound } from "next/navigation"
import SectionLayout from "@/components/section-layout"
import SlimeCursor from "@/components/slime-cursor"
import ClothingSectionGallery from "@/components/clothing-section-gallery"
import { getClothingBrandBySlug, getSectionById, getAllSectionSlugs } from "@/lib/clothing-data"

export async function generateStaticParams() {
  return getAllSectionSlugs().map(({ brand, section }) => ({ 
    slug: brand, 
    section 
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; section: string }> }) {
  const { slug, section: sectionId } = await params
  const brand = getClothingBrandBySlug(slug)
  const section = getSectionById(slug, sectionId)
  
  if (!brand || !section) {
    return { title: "Section Not Found" }
  }

  return {
    title: `${section.label} | ${brand.label} | Inigo Paolo`,
    description: `${section.label} gallery for ${brand.label}`,
  }
}

export default async function ClothingSectionPage({ params }: { params: Promise<{ slug: string; section: string }> }) {
  const { slug, section: sectionId } = await params
  const brand = getClothingBrandBySlug(slug)
  const section = getSectionById(slug, sectionId)

  if (!brand || !section) {
    notFound()
  }

  return (
    <>
      <SlimeCursor />
      <SectionLayout plainBackground>
        <ClothingSectionGallery brand={brand} section={section} />
      </SectionLayout>
    </>
  )
}
