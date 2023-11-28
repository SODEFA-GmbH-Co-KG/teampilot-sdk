import { ZodSchema, z } from 'zod'
import { getBaseUrl } from './getBaseUrl'

const defaultMetadataSchema = z.any()

export const initTeampilotCollection = <
  T extends ZodSchema = typeof defaultMetadataSchema
>({
  collectionSecret,
  metadataSchema = defaultMetadataSchema as any,
}: {
  collectionSecret?: string
  metadataSchema?: T
}) => {
  const url = `${getBaseUrl()}/api/rest/collection`

  // Check if collectionSecret is provided
  if (!collectionSecret) {
    collectionSecret =
      process.env.NEXT_PUBLIC_TEAMPILOT_COLLECTION_SECRET ||
      process.env.TEAMPILOT_COLLECTION_SECRET
  }
  if (!collectionSecret) {
    throw new Error(
      'Provide a collectionSecret in the function call or in the environment variables via TEAMPILOT_COLLECTION_SECRET or NEXT_PUBLIC_TEAMPILOT_COLLECTION_SECRET'
    )
  }

  // Upsert Items
  const upsertItems = async ({
    items,
  }: {
    items: {
      id: string
      text: string
      metadata?: z.infer<T>
    }[]
  }) => {
    const schema = z.object({
      id: z.string(),
      text: z.string(),
      metadata: metadataSchema,
    })
    const parsed = items.map((item) => schema.parse(item))
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        collectionSecret,
        items: parsed,
      }),
    })
  }

  // Search Items
  const searchItems = async ({
    searchQuery,
    limit,
  }: {
    searchQuery: string
    limit?: number
  }) => {
    const params = new URLSearchParams({
      collectionSecret: collectionSecret!,
      searchQuery,
    })
    if (limit) {
      params.set('limit', `${limit}`)
    }
    const response = await fetch(`${url}?${params}`).then((res) => res.json())
    const schema = z.object({
      results: z.array(
        z.object({
          id: z.string(),
          text: z.string(),
          metadata: metadataSchema,
          similarityScore: z.number(),
        })
      ),
    })
    const parsed = schema.parse(response)
    return parsed
  }

  const deleteOne = async ({ itemId }: { itemId: string }) => {
    const params = new URLSearchParams({
      collectionSecret: collectionSecret!,
      itemId,
    })
    await fetch(`${url}?${params}`, { method: 'DELETE' })
  }

  const deleteAll = async () => {
    const params = new URLSearchParams({
      collectionSecret: collectionSecret!,
    })
    await fetch(`${url}?${params}`, { method: 'DELETE' })
  }

  return {
    upsertItems,
    searchItems,
    deleteOne,
    deleteAll,
  }
}
