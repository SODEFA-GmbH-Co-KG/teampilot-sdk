import { initTeampilotCollection } from "@teampilot/sdk"
import { revalidatePath } from "next/cache"
import { Button } from "~/shadcn/components/ui/button"

const collection = initTeampilotCollection({})

export const Collections = async () => {
  const { results } = await collection.searchItems({
    searchQuery: "earth",
  })

  const redo = async () => {
    "use server"
    const collection = initTeampilotCollection({})
    await collection.upsertItems({
      items: [
        {
          id: "my-id-1",
          text: "Hello",
          metadata: {},
        },
        {
          id: "my-id-2",
          text: "World",
          metadata: {},
        },
      ],
    })
    revalidatePath("/collections")
  }

  return (
    <>
      <pre className="mb-4 text-xs">{JSON.stringify(results, null, 2)}</pre>
      <form action={redo}>
        <Button type="submit">Redo</Button>
      </form>
    </>
  )
}
