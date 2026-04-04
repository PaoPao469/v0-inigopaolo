import { notFound } from "next/navigation"
import SectionLayout from "@/components/section-layout"
import SlimeCursor from "@/components/slime-cursor"
import CarPhotographySection from "@/components/car-photography-section"
import ModelPhotographyGallery from "@/components/model-photography-gallery"
import { getAllPhotographySlugs, getPhotographyCategory, hasSubsections } from "@/lib/photography-data"

export async function generateStaticParams() {
  return getAllPhotographySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getPhotographyCategory(slug)

  if (!category) {
    return { title: "Not Found" }
  }

  return {
    title: `${category.label} | Photography | Inigo Paolo`,
    description: category.description,
  }
}

export default async function PhotographyCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getPhotographyCategory(slug)

  if (!category) {
    notFound()
  }

  const isCarPhotography = hasSubsections(slug)

  return (
    <>
      <SlimeCursor />
      <SectionLayout>
        {isCarPhotography ? (
          <CarPhotographySection category={category as typeof category & { subsections: Array<{ id: string; title: string; images: string[] }> }} />
        ) : (
          <ModelPhotographyGallery category={category as typeof category & { images: string[] }} />
        )}
      </SectionLayout>
    </>
  )
}
