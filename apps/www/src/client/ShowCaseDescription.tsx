import { teampilot } from "~/teampilot"

export const ShowCaseDescription = async ({
  title,
  code,
  description,
}: {
  title: string
  code: string
  description?: string
}) => {
  description =
    description ||
    (await teampilot.sdkExpert.fetchText({
      message: `Describe how this example show why Teampilot SDK is awesome. Dont explain the code. Just explain the use case briefly. Title: ${title} \n Code: ${code}`,
    }))

  return (
    <>
      <p className="text-xs text-muted-foreground lg:text-lg">{description}</p>
    </>
  )
}
