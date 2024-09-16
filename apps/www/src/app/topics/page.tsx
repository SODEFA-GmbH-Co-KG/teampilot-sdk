import { Divider } from "~/shared/Divider"
import { generateOgUrl } from "../og/generateOGUrl"
import { Caching } from "./Caching"
import { CustomFunctions } from "./CustomFunctions"
import { FetchingViaApi } from "./FetchingViaApi"
import { FetchingViaSdk } from "./FetchingViaSdk"
import { Launchpads } from "./Launchpads"

export const metadata = {
  openGraph: {
    title: `Topics | Teampilot Docs`,
    type: "article",
    images: [
      {
        url: generateOgUrl({ title: "Topics" }),
        width: 1200,
        height: 630,
        alt: "Topics",
      },
    ],
    siteName: "docs.teampilot.ai",
  },
}

export default function Page() {
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <Launchpads />
      <Divider />
      <CustomFunctions />
      <Divider />
      <Caching />
      <Divider />
      <FetchingViaApi />
      <Divider />
      <FetchingViaSdk />
    </div>
  )
}
