import { notFound } from "next/navigation"
import SectionLayout from "@/components/section-layout"
import SlimeCursor from "@/components/slime-cursor"
import ClothingBrandDetail from "@/components/clothing-brand-detail"
import { getClothingBrandBySlug, getAllClothingSlugs } from "@/lib/clothing-data"

export async function generateStaticParams() {
  return getAllClothingSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = getClothingBrandBySlug(slug)
  
  if (!brand) {
    return { title: "Brand Not Found" }
  }

  return {
    title: `${brand.label} | Clothing | Inigo Paolo`,
    description: brand.description,
  }
}

export default async function ClothingBrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = getClothingBrandBySlug(slug)

  if (!brand) {
    notFound()
  }

  return (
    <>
      <SlimeCursor />
      <SectionLayout plainBackground>
        <ClothingBrandDetail brand={brand} />
      </SectionLayout>
    </>
  )
}
