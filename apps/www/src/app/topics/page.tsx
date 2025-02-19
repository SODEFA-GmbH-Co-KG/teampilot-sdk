import { Divider } from "~/shared/Divider"
import { Caching } from "./Caching"
import { CustomFunctions } from "./CustomFunctions"
import { FetchingViaApi } from "./FetchingViaApi"
import { FetchingViaSdk } from "./FetchingViaSdk"
import { Launchpads } from "./Launchpads"
import { NavigationFooter } from "~/shared/navigation-footer"

export const metadata = {
  title: "Teampilot SDK Topics",
  alternates: {
    canonical: 'https://docs.teampilot.ai/topics',
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
      <NavigationFooter 
        prevHref="/getting-started" 
        prevLabel="Getting Started"
        nextHref="/examples"
        nextLabel="Examples"
      />
    </div>
  )
}
