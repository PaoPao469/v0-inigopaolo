// Project color themes derived from each project's photo palette
export const projectColorThemes: Record<string, { primary: string; secondary: string; accent: string }> = {
  // Seaside House - warm sandy beige tones from the coastal setting
  'seaside-house': {
    primary: 'rgba(210, 195, 170, 0.95)',    // warm sand
    secondary: 'rgba(190, 175, 155, 0.8)',   // muted beige
    accent: 'rgba(180, 165, 140, 0.7)',      // soft tan
  },
  // The Exhibit - cool gray tones from the minimalist cube renders
  'the-exhibit': {
    primary: 'rgba(180, 190, 200, 0.95)',    // cool steel gray
    secondary: 'rgba(160, 170, 185, 0.8)',   // slate blue-gray
    accent: 'rgba(145, 155, 170, 0.7)',      // muted blue
  },
  // Marina Vista Raceway - vibrant warm tones from the dancer image
  'marina-vista-raceway': {
    primary: 'rgba(220, 180, 160, 0.95)',    // warm coral
    secondary: 'rgba(200, 165, 145, 0.8)',   // dusty rose
    accent: 'rgba(185, 150, 130, 0.7)',      // terracotta
  },
  // Vertical Landscapes - organic green tones
  'vertical-landscapes': {
    primary: 'rgba(170, 195, 175, 0.95)',    // sage green
    secondary: 'rgba(155, 180, 160, 0.8)',   // muted olive
    accent: 'rgba(140, 165, 145, 0.7)',      // moss
  },
  // Sky Bridge - warm welcoming amber
  'sky-bridge': {
    primary: 'rgba(215, 190, 155, 0.95)',    // warm amber
    secondary: 'rgba(195, 175, 145, 0.8)',   // golden beige
    accent: 'rgba(180, 160, 130, 0.7)',      // caramel
  },
  // Elemental Pavilions - futuristic purple-blue
  'elemental-pavilions': {
    primary: 'rgba(190, 180, 210, 0.95)',    // soft lavender
    secondary: 'rgba(170, 165, 195, 0.8)',   // muted violet
    accent: 'rgba(155, 150, 180, 0.7)',      // dusty purple
  },
}

// Default color theme for projects without a specific theme
export const defaultColorTheme = {
  primary: 'rgba(200, 205, 215, 0.95)',
  secondary: 'rgba(200, 205, 215, 0.8)',
  accent: 'rgba(200, 205, 215, 0.7)',
}

// Helper to get color theme for a project
export function getProjectColorTheme(projectId: string) {
  return projectColorThemes[projectId] || defaultColorTheme
}

// Project data organized by year - shared between server and client
export const portfolioData = {
  "year-1": {
    label: "YEAR 1",
    slug: "year-1",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
    projects: [
      {
        id: "seaside-house",
        category: "RECTILINEAR FORM STUDY",
        title: "SEASIDE",
        titleAccent: "HOUSE",
        description: "Project Description\n\nA study in rectilinear composition exploring how simple geometric volumes can be manipulated to create dynamic architectural form. The project investigates spatial relationships through the combination of three primary volumes.\n\nThought Process\n\nThe design developed through experimenting with operations such as stacking, shifting, and cantilevering. The goal was to create a balanced composition that feels both structured and open, resulting in a modern waterfront dwelling with clear form and strong spatial hierarchy.",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/house-RDLsUrBoz9hYmlANOYqgFsdNYDLyV4.png",
        images: [],
        imageSections: [
          {
            label: "Minecraft Render",
            preserveHeroAspect: true,
            images: [
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/house-RDLsUrBoz9hYmlANOYqgFsdNYDLyV4.png",
            ],
          },
          {
            label: "Chosen Form Bristol Model",
            images: [
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-5DXtDPF75ORYKM5eBM5EPyND4UIKGr.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-YW6oZWFyeZY12Pw7C7NEPNohxrRUp1.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-MKqBV5grZPeF0OySpjPYwrFMmeh7h6.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-fagpK1Z5WaAaxj9iaVmOZneF6efgqG.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-xV54ehBhM3JPL1P8zAJBTPnvmJr5YR.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-By73bYoYT7tWESMs0r99swyd6BBL0m.jpg",
            ],
          },
          {
            label: "Clay Model",
            preserveHeroAspect: true,
            images: [
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clay%20model-ACVwfGgoKX9EJcp9Wp2lfHVI85Qi64.jpg",
            ],
          },
        ],
      },
      {
        id: "the-exhibit",
        category: "NARRATIVE GRID SYSTEMS",
        title: "THE",
        titleAccent: "EXHIBIT",
        description: "Project Description\n\nAn experimental spatial system based on cube grids, exploring repetition, circulation, and perception. The project creates a layered architectural environment that challenges orientation and encourages exploration.\n\nThought Process\n\nThe design is driven by a narrative of an exclusive and mysterious exhibition that reveals itself only once entered. The space is conceived as immersive and disorienting, where repeating rooms and continuous circulation create a sense of endlessness. Subtle variations within the grid distort perception, making it difficult to distinguish direction or progression. The architecture acts almost as a living system guiding, trapping, and reshaping the user's experience over time.",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/render%201-NdiGixNSfVbgBI23WtoYCOUSFgOax6.jpg",
        images: [],
        imageSections: [
          {
            label: "Rhino Renders",
            isHeroFirst: true,
            preserveHeroAspect: true,
            images: [
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/render%201-NdiGixNSfVbgBI23WtoYCOUSFgOax6.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/render%202-KvTPQqQ0XS3730frk1RBCik1gzimT6.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/render%203-n119k1Mf8MFsAgWheRYwvMBgOjPZby.jpg",
            ],
          },
          {
            label: "Model Photos",
            images: [
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-Q0dKkVufsh0wjSQWOFui0FCqWMOInz.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-LzElRHotngL5SnyDF62TUzxZBNZG9p.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-OnKwG81sVp7hbkFLzoVMJSfGDNFm5r.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-z5jGySpBFdi977ZBvsG4zzugLADIqO.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-GKU9VGFQ85nS9X9ZDmEZFPUC3OV34v.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-VjNiVy9cu8T2dv9C7e1agmXTVfAPI2.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-rqXRrLfwbQeWjnqHNYEGqpLy3OrAfI.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-MMkZtx78DUn065S1MJV0nyFjCcwwza.jpg",
            ],
          },
          {
            label: "Drawings",
            images: [
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drawing%203-FEwIiPRnFTnn2cDVdrYL4uZo7OTYo9.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drawing%202-H5bKdyATbyc9kX27kB9t6IchCI6Lme.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drawing%201-4S6XMQBDG5O3BXqHXWq11z2V9UQ2F4.jpg",
            ],
          },
        ],
      },
      {
        id: "marina-vista-raceway",
        category: "IMPOSSIBLE LANDSCAPES STUDY",
        title: "MARINA VISTA",
        titleAccent: "RACEWAY",
        description: "Project Description\n\nAn integrated landscape project that translates abstract visual inspiration into a cohesive spatial system. The design explores how movement, topography, and circulation can be unified to create a dynamic environment that engages both users and spectators.\n\nThought Process\n\nThe project began by translating the motion and flow of the reference image into a continuous landscape. The idea of a Formula 1 track was introduced as a way to express speed and direction through form. The design focuses on enhancing both the driver and spectator experience by incorporating multiple viewing points, layered circulation paths, and varied elevations, creating a more immersive and engaging environment.",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/main%20image-trdRozYQam0xLD6avW6jR6Y0LwkDAm.png",
        images: [],
        imageSections: [
          {
            label: "Track Layout",
            isHeroFirst: true,
            preserveHeroAspect: true,
            images: [
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/main%20image-trdRozYQam0xLD6avW6jR6Y0LwkDAm.png",
            ],
          },
          {
            label: "Model Photos",
            images: [
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-vdKWzsveVYaN7sr8tyQCFRQhrtCUEo.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-B3L5RVjxDvIvQM70hn6rm397NBP9NB.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-sQjujWokboPzpRJ6MP6YG7lkOkzkUR.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-JO342LFkpL7dhNyzk6nUzJr7Diere5.jpg",
            ],
          },
          {
            label: "Chosen Image",
            preserveHeroAspect: true,
            images: [
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Chosen%20image-NMR2AeKoZ0BJTRUS7vfkr6SRhG701k.jpg",
            ],
          },
          {
            label: "Drawings and Diagrams",
            images: [
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sections-L9j55XiID9qOUr2CeBKbV8brTZg23Q.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drawing%201-ogCSxBvSmQux0ttPT3ZW7KtJEpNzAQ.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drawing%202-RvRKsEmFx6wDCTFQCyjEkh50RJ94xq.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drawing%203-f0aNHOArAcqnCfFXHdEZzoDrqyNFzD.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chosen%20image%202-VANOlWoxGZgpTVhCrVWLLAgNnVufqA.jpg",
            ],
          },
        ],
      },
    ],
  },
  "year-2": {
    label: "YEAR 2",
    slug: "year-2",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
    projects: [
      {
        id: "vertical-landscapes",
        category: "COMMERCIAL",
        title: "VERTICAL",
        titleAccent: "LANDSCAPES",
        description: "Project Description\n\nA multi-story commercial development that reimagines the traditional office building. The design incorporates green spaces at multiple levels, creating a vertical ecosystem that promotes well-being and sustainability.\n\nThought Process\n\nRedefining workplace environments through the integration of nature and architecture.",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
        ],
      },
      {
        id: "sky-bridge",
        category: "URBAN CONNECTOR STUDY",
        title: "SKY",
        titleAccent: "BRIDGE",
        description: "Project Description\n\nAn architectural intervention designed to connect two buildings through an elevated bridge structure. The project explores how circulation, structure, and enclosure can be integrated to create a functional yet expressive space within a dense urban environment.\n\nThought Process\n\nThe design focused on transforming a simple bridge into an engaging spatial experience. By introducing layered surfaces and vertical elements, the structure enhances movement while creating moments of light, shadow, and visual connection. The goal was to balance functionality with atmosphere, turning circulation into an architectural feature rather than just a passage.",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/render%201-MjGYsivPTnBcPORzsKl6gkXDAjsP9g.jpg",
        images: [],
        imageSections: [
          {
            label: "Renders",
            isHeroFirst: true,
            preserveHeroAspect: true,
            images: [
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/render%201-MjGYsivPTnBcPORzsKl6gkXDAjsP9g.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/render%202-L4CQ2r35XJAHSpCblgAq48LFTaTnwv.png",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/render%203-r0meL7P671wPOOTgyOWAiP4Lys4OR9.png",
            ],
          },
          {
            label: "Model Photos",
            images: [
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-qvo5ke0ysjXCYz7QmNO0bEAl0PPzFc.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-C5X5nuhl2u0bZfc8yLarKxQ2YLKar4.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-nhfzhPKS1Gs25yFeo1PjtLqj7NYRZX.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-mYGLngcJXUoD1tjPNCAFLDZ4KK6Cv3.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-z1JSqHHQ2Bc74iPsUdw4ABHHMQsgSX.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-GvkPdkEswy8XmH142RGD4RvZ0VGEuH.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-ilfxqDjum3ALePfRGG7Jyi81dD2rWM.jpg",
            ],
          },
          {
            label: "Drawings",
            images: [
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drawing%201-ZtrAIyYeAEOi6cGB2TJwqoJTbUiJ6r.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drawing%202-N8dnfvZG4S3AfQkJoHnK5hKIqWE6kU.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drawing%203-mx8dnRROlsFzbbH3xzh1IA92VrzoTf.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drawing%204-8Tpy0QN9daA8nRWURjjFiKmEWN6uGe.jpg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drawing%205-cqLsNP83BiGzsxKqlnbDpK3xT9raSM.jpg",
            ],
          },
        ],
      },
      {
        id: "elemental-pavilions",
        category: "SITE-RESPONSIVE PAVILION DESIGN",
        title: "ELEMENTAL",
        titleAccent: "PAVILIONS",
        description: "Project Description\n\nA series of pavilions designed within a natural landscape, responding to site conditions, circulation patterns, and user interaction. The project integrates programmatic elements such as a ranger station and restroom facilities with spaces for observation and nature engagement.\n\nThought Process\n\nThe design was driven by the intention to blend architecture with the surrounding environment. Forms were developed to feel organic and continuous with the landscape, guiding movement while minimizing visual disruption. Program placement was informed by accessibility and privacy, creating a balance between public use and quiet interaction with nature.",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
        ],
      },
    ],
  },
}

// Helper to get all projects as flat array
export function getAllProjects() {
  return [
    ...portfolioData["year-1"].projects,
    ...portfolioData["year-2"].projects,
  ]
}

// Helper to find project by ID
export function getProjectById(id: string) {
  return getAllProjects().find((p) => p.id === id)
}

// Helper to get year data by slug
export function getYearBySlug(slug: string) {
  return portfolioData[slug as keyof typeof portfolioData]
}

// Get all year slugs for static generation
export function getAllYearSlugs() {
  return Object.keys(portfolioData)
}

// Helper to find which year a project belongs to
export function getYearForProject(projectId: string) {
  for (const [slug, yearData] of Object.entries(portfolioData)) {
    if (yearData.projects.some((p) => p.id === projectId)) {
      return { slug, label: yearData.label }
    }
  }
  return null
}
