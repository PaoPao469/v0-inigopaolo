import { notFound } from "next/navigation"
import SectionLayout from "@/components/section-layout"
import SlimeCursor from "@/components/slime-cursor"
import SubsectionGallery from "@/components/subsection-gallery"
import FerrariShowcase from "@/components/ferrari-showcase"
import ShelbyShowcase from "@/components/shelby-showcase"
import ToyotaShowcase from "@/components/toyota-showcase"
import { getAllPhotographySlugs, getPhotographyCategory, getSubsection, hasSubsections } from "@/lib/photography-data"

export async function generateStaticParams() {
  const params: Array<{ slug: string; subsection: string }> = []

  for (const slug of getAllPhotographySlugs()) {
    if (hasSubsections(slug)) {
      const category = getPhotographyCategory(slug)
      if (category && "subsections" in category) {
        for (const sub of category.subsections) {
          params.push({ slug, subsection: sub.id })
        }
      }
    }
  }

  return params
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; subsection: string }> }) {
  const { slug, subsection: subsectionId } = await params
  const category = getPhotographyCategory(slug)
  const subsection = getSubsection(slug, subsectionId)

  if (!category || !subsection) {
    return { title: "Not Found" }
  }

  return {
    title: `${subsection.title} | ${category.label} | Inigo Paolo`,
    description: `${subsection.title} photography collection`,
  }
}

export default async function SubsectionPage({ params }: { params: Promise<{ slug: string; subsection: string }> }) {
  const { slug, subsection: subsectionId } = await params
  const category = getPhotographyCategory(slug)
  const subsection = getSubsection(slug, subsectionId)

  if (!category || !subsection) {
    notFound()
  }

  // Use dedicated showcase components for Ferrari, Shelby, and Toyota
  const isFerrari = subsectionId === "ferrari"
  const isShelby = subsectionId === "shelby"
  const isToyota = subsectionId === "toyota"

  return (
    <>
      <SlimeCursor />
      <SectionLayout>
        {isFerrari ? (
          <FerrariShowcase
            categoryLabel={category.label}
            categorySlug={slug}
            images={subsection.images}
          />
        ) : isShelby ? (
          <ShelbyShowcase
            categoryLabel={category.label}
            categorySlug={slug}
            images={subsection.images}
          />
        ) : isToyota ? (
          <ToyotaShowcase
            categoryLabel={category.label}
            categorySlug={slug}
            images={subsection.images}
          />
        ) : (
          <SubsectionGallery
            categoryLabel={category.label}
            categorySlug={slug}
            subsection={subsection}
          />
        )}
      </SectionLayout>
    </>
  )
}
