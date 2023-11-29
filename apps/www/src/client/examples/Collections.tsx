import { initTeampilotCollection } from "@teampilot/sdk"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { Button } from "~/shadcn/components/ui/button"

const collection = initTeampilotCollection({
  metadataSchema: z.object({
    myDate: z.string(),
  }),
})

export const Collections = async () => {
  const { results } = await collection.searchItems({
    searchQuery: "earth",
  })

  const update = async () => {
    "use server"
    await collection.upsertItems({
      items: [
        {
          id: "my-id-1",
          text: "Hello",
          metadata: {
            myDate: new Date().toISOString(),
          },
        },
        {
          id: "my-id-2",
          text: "World",
          metadata: {
            myDate: new Date().toISOString(),
          },
        },
      ],
    })
    revalidatePath("/collections")
  }

  return (
    <>
      <pre className="mb-4 text-xs">{JSON.stringify(results, null, 2)}</pre>
      <form action={update}>
        <Button type="submit">Update</Button>
      </form>
    </>
  )
}
