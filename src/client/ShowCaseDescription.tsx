import { use } from "react"
import { env } from "~/env.mjs"
import { fetchTeampilot } from "~/teampilot-sdk"

export const ShowCaseDescription = ({
  title,
  code,
}: {
  title: string
  code: string
}) => {
  const {
    message: { content: description },
  } = use(
    fetchTeampilot({
      launchpadSlugId: env.LAUNCHPAD_SLUG_ID_SDK_EXPERT,
      message: `Explain this code very briefly. Title: ${title} \n Code: ${code}`,
    })
  )
  return (
    <>
      <p className="text-lg text-muted-foreground">{description}</p>
    </>
  )
}
