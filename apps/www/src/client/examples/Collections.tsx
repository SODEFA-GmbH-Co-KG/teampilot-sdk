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

  return (
    <div className="flex flex-col gap-4">
      {/* SEARCH */}
      <>
        {results.map((result) => (
          <div key={result.id}>
            <div className="font-mono text-xs opacity-60">{result.id}</div>
            <div>{result.text}</div>
            <div className="text-xs">
              myDate: {new Date(result.metadata.myDate).toUTCString()}
            </div>
            <div className="font-mono text-xs opacity-60">
              Similarity: {result.similarityScore}
            </div>
          </div>
        ))}
      </>

      {/* UPSERT */}
      <form
        action={async () => {
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
        }}
      >
        <Button type="submit">Upsert</Button>
      </form>

      {/* DELETE */}
      <form
        action={async () => {
          "use server"
          await collection.deleteOne({
            itemId: "my-id-2",
          })
          revalidatePath("/collections")
        }}
      >
        <Button type="submit" variant="destructive">
          Delete my-id-2
        </Button>
      </form>
    </div>
  )
}
