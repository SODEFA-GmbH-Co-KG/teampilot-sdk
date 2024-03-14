import { Divider } from "~/shared/Divider"
import { CustomFunctions } from "./CustomFunctions"
import { Launchpads } from "./Launchpads"

export default function Page() {
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <Launchpads />
      <Divider />
      <CustomFunctions />
      {/* <Divider />
      <Caching />
      <Divider />
      <FetchingViaApi />
      <Divider />
      <FetchingViaSdk /> */}
    </div>
  )
}
