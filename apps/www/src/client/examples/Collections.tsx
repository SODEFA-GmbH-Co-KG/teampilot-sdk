import { initTeampilotCollection } from "@teampilot/sdk"

const collection = initTeampilotCollection({})

export const Collections = async () => {
  const results = await collection.searchItems({
    searchQuery: "earth",
  })
  return (
    <>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </>
  )
}
