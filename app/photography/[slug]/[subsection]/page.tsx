import { notFound } from "next/navigation"
import SectionLayout from "@/components/section-layout"
import SlimeCursor from "@/components/slime-cursor"
import SubsectionGallery from "@/components/subsection-gallery"
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

  return (
    <>
      <SlimeCursor />
      <SectionLayout>
        <SubsectionGallery
          categoryLabel={category.label}
          categorySlug={slug}
          subsection={subsection}
        />
      </SectionLayout>
    </>
  )
}
