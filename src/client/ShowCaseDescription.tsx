import { teampilot } from "~/teampilot"

export const ShowCaseDescription = async ({
  title,
  code,
}: {
  title: string
  code: string
}) => {
  const description = await teampilot.sdkExpert.fetchText({
    message: `Explain this code very briefly. Title: ${title} \n Code: ${code}`,
  })

  return (
    <>
      <p className="text-lg text-muted-foreground">{description}</p>
    </>
  )
}
