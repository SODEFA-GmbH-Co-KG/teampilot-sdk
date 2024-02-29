import { z } from "zod"

export type BadgeType =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Expert"
  | "Code"
  | "No-Code"

export type SubTopic = {
  title: string
  slug: string
  icon?: string
  description?: string
  badges?: BadgeType[]
  subTopics?: SubTopic[]
}

export type Topic = {
  title: string
  slug: string
  subTopics: SubTopic[]
}

export type TopicsArray = readonly Topic[]

export const TOPICS = [
  {
    title: "Getting Started",
    slug: "/getting-started" as const,
    subTopics: [
      {
        title: "Provide a public Launchpad",
        slug: "/provide-a-public-launchpad" as const,
        icon: "🚀",
        description: "Integrating your product into Teampilot.",
        badges: ["Beginner", "No-Code"],
      },
      {
        title: "Create a custom Chatbot",
        slug: "/create-a-custom-chatbot" as const,
        icon: "🤖",
        description: "Integrating Teampilot into your product.",
        badges: ["Intermediate", "No-Code"],
      },
      {
        title: "SDK: Add AI superpowers to your existing Project",
        slug: "/add-ai-to-your-existing-project" as const,
        icon: "✨",
        description:
          "Take what you need to enhance your current business processes.",
        badges: ["Advanced", "Code"],
      },
      {
        title: "SDK: Create a new AI Project from scratch",
        slug: "/create-a-new-ai-project-from-scratch" as const,
        icon: "🎉",
        description:
          "An in depth Walkthrough through our Teampilot Starter Repository.",
        badges: ["Expert", "Code"],
      },
    ] as const,
  },
  // {
  //   title: "Important Concepts",
  //   slug: "/important-concepts" as const,
  //   subTopics: [
  //     {
  //       title: "Sequence Diagram",
  //       slug: "#sequence-diagram" as const,
  //     },
  //     {
  //       title: "Infrastructure",
  //       slug: "#infrastructure" as const,
  //     },
  //   ] as const,
  // },
  {
    title: "Topics",
    slug: "/topics" as const,
    subTopics: [
      {
        title: "Launchpads",
        slug: "#launchpads" as const,
        subTopics: [
          {
            title: "Settings",
            slug: "-settings" as const,
          },
          {
            title: "Widget",
            slug: "-widget" as const,
          },
        ],
      },
      {
        title: "Custom Functions",
        slug: "#custom-functions" as const,
        subTopics: [
          {
            title: "Hosted Functions",
            slug: "-hosted-functions" as const,
          },
          {
            title: "HTTP Functions",
            slug: "-http-functions" as const,
          },
          {
            title: "Widget Functions",
            slug: "-widget-functions" as const,
          },
        ] as const,
      },
      {
        title: "Caching",
        slug: "#caching" as const,
      },
      {
        title: "Fetching via API/SDK",
        slug: "#fetching-via-api-sdk" as const,
      },
    ] as const,
  },
  {
    title: "Examples",
    slug: "/examples" as const,
    subTopics: [
      {
        title: "Schema",
        slug: "#schema" as const,
      },
      {
        title: "Interaction",
        slug: "#interaction" as const,
      },
      {
        title: "Functions",
        slug: "#functions" as const,
        subTopics: [
          {
            title: "Time",
            slug: "-time" as const,
          },
          {
            title: "Form",
            slug: "-form" as const,
          },
          {
            title: "Passing Custom Functions",
            slug: "-passing-custom-functions" as const,
          },
          {
            title: "Calling a Function from Widget",
            slug: "-calling-a-function-from-widget" as const,
          },
        ] as const,
      },
      {
        title: "Media",
        slug: "#media" as const,
      },
      {
        title: "Seo",
        slug: "#seo" as const,
      },
    ] as const,
  },
  {
    title: "SDK Docs",
    slug: "/sdk-docs" as const,
    subTopics: [
      {
        title: "Installation and Setup",
        slug: "#installation" as const,
      },
      {
        title: "API Reference",
        slug: "#api-reference" as const,
        subTopics: [
          {
            title: ".createTeampilotClient()",
            slug: "-create-teampilot-client" as const,
          },
          {
            title: ".fetchTeampilot()",
            slug: "-fetch-teampilot" as const,
          },
          {
            title: ".fetchTeampilotData()",
            slug: "-fetch-teampilot-data" as const,
          },
          {
            title: ".fetchTeampilotText()",
            slug: "-fetch-teampilot-text" as const,
          },
          {
            title: ".teampilotWidget()",
            slug: "-teampilot-widget" as const,
          },
          {
            title: ".teampilotFunctionHandler()",
            slug: "-teampilot-function-handler" as const,
          },
          {
            title: ".transformZodToJsonSchema()",
            slug: "-transform-zod-to-json-schema" as const,
          },
        ] as const,
      },
    ] as const,
  },
  {
    title: "API Docs",
    slug: "/api-docs" as const,
    subTopics: [
      {
        title: "POST /message",
        slug: "#post-message" as const,
      },
      {
        title: "GET /collection/info",
        slug: "#get-collection-info" as const,
      },
      {
        title: "POST /collection/items",
        slug: "#post-collection-items" as const,
      },
      {
        title: "GET /collection/items",
        slug: "#get-collection-items" as const,
      },
      {
        title: "DELETE /collection/items",
        slug: "#delete-collection-items" as const,
      },
    ] as const,
  },
  {
    title: "Recipes",
    slug: "/recipes" as const,
    subTopics: [
      {
        title: "FAQ bot via Embeddings",
        slug: "#faq-bot-via-embeddings" as const,
      },
    ] as const,
  },
  // {
  //   title: "Capabilities",
  //   slug: "/capabilities" as const,
  //   subTopics: [
  //     {
  //       title: "Using AI everywhere",
  //       slug: "#using-ai-everywhere" as const,
  //     },
  //     {
  //       title: "Extending existing LLM's",
  //       slug: "#extending-existing-llms" as const,
  //     },
  //     {
  //       title: "Guaranteeing type safe JSON responses",
  //       slug: "#guaranteeing-type-safe-json-responses" as const,
  //     },
  //     {
  //       title: "Multimodality",
  //       slug: "#multimodality" as const,
  //     },
  //   ] as const,
  // },
  // {
  //   title: "Boundaries",
  //   slug: "/boundaries" as const,
  //   subTopics: [
  //     {
  //       title: "No streaming via SDK",
  //       slug: "#no-streaming-via-sdk" as const,
  //     },
  //     {
  //       title: "No media post via SDK",
  //       slug: "#no-media-post-via-sdk" as const,
  //     },
  //     {
  //       title: "No speech to text via SDK",
  //       slug: "#no-speech-to-text-via-sdk" as const,
  //     },
  //   ] as const,
  // },
] as const

type ExtractSlug<T> = T extends { slug: infer Slug } ? Slug : never
type HasSubTopics<T> = T extends { subTopics: any } ? T : never

export type FirstLevelSlug = ExtractSlug<(typeof TOPICS)[number]>
export type SecondLevelSlug = ExtractSlug<
  (typeof TOPICS)[number]["subTopics"][number]
>
export type ThirdLevelSlug = ExtractSlug<
  HasSubTopics<
    (typeof TOPICS)[number]["subTopics"][number]
  >["subTopics"][number]
>

type SlugWithSubTopic = FirstLevelSlug | SecondLevelSlug

const subTopicWithBadges = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  badges: z.array(z.string()),
  icon: z.string().optional(),
})

type SubTopicWithBadges = z.infer<typeof subTopicWithBadges>

export const getAllSubTopicsForCardsBySlug = (slug: SlugWithSubTopic) => {
  const topic = TOPICS.find((t) => t.slug === slug)
  if (!topic) return []
  if (!topic.subTopics) return []

  const parsedTopics = topic.subTopics.map((subTopic) => {
    const parsed = subTopicWithBadges.safeParse(subTopic)
    if (!parsed.success) {
      console.log(
        "Topic is not correctly configured for displaying it in cards. Please check the schema."
      )
      console.log(parsed.error)
      return
    }
    return parsed.data
  })

  return parsedTopics.filter(Boolean) as SubTopicWithBadges[]
}

export const getIdForTopic = ({
  secondLevelSlug,
  thirdLevelSlug,
}: {
  secondLevelSlug: SecondLevelSlug
  thirdLevelSlug?: ThirdLevelSlug
}) => {
  const trimmedSecondLevelSlug = secondLevelSlug.replace("#", "")
  const trimmedThirdLevelSlug = thirdLevelSlug?.replace("#", "")
  if (thirdLevelSlug) {
    return `${trimmedSecondLevelSlug}${trimmedThirdLevelSlug}`
  }
  return `${trimmedSecondLevelSlug}`
}
