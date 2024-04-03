import { Collections } from "~/client/examples/Collections"
import { ShowCase } from "~/client/ShowCase"

export default function Page() {
  return (
    <>
      <ShowCase
        // layout="side-by-side"
        title="Collections"
        code={`import { initTeampilotCollection } from "@teampilot/sdk"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { Button } from "~/shadcn/components/ui/button"

export const Collections = async () => {
  const collection = await initTeampilotCollection({
    metadataSchema: z.object({
      myDate: z.string(),
    }),
  })
  
  const searchQuery = "earth"
  const { results } = await collection.searchItems({
    searchQuery,
  })

  return (
    <div className="flex flex-col items-center gap-4">
      {/* SEARCH */}
      <>
        <>Searching for &quot;{searchQuery}&quot;</>
        {results.map((result) => (
          <div
            key={result.id}
            className="flex flex-col items-center gap-4 rounded border border-border p-2"
          >
            <div className="flex flex-row gap-6 font-mono text-xs opacity-60">
              <div className="flex-1">{result.id}</div>
              <div className="">
                Similarity: {result.similarityScore.toFixed(3)}
              </div>
            </div>
            <div className="italic">{\`"\${result.text}"\`}</div>
            <div className="text-xs">
              {new Date(result.metadata.myDate).toUTCString()}
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
}`}
      >
        <Collections />
      </ShowCase>
    </>
  )
}
