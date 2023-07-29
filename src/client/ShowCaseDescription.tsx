import { teampilot } from "~/teampilot"

export const ShowCaseDescription = async ({
  title,
  code,
}: {
  title: string
  code: string
}) => {
  const description = await teampilot.sdkExpert.fetchText({
    message: `Describe how this example show why Teampilot SDK is awesome. Dont explain the code. Just explain the use case briefly. Title: ${title} \n Code: ${code}`,
  })

  return (
    <>
      <p className="text-lg text-muted-foreground">{description}</p>
    </>
  )
}
