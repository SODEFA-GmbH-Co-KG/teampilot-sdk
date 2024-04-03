import { ZodSchema, z } from 'zod'
import { getEnv } from './denoCompatibility/getEnv'
import { getBaseUrl } from './getBaseUrl'

const defaultMetadataSchema = z.any()

export const initTeampilotCollection = async <
  T extends ZodSchema = typeof defaultMetadataSchema
>({
  collectionSecret,
  metadataSchema = defaultMetadataSchema as any,
}: {
  collectionSecret?: string
  metadataSchema?: T
}) => {
  const urlCollection = `${await getBaseUrl()}/api/rest/collection`
  const urlInfo = `${urlCollection}/info`
  const urlItems = `${urlCollection}/items`

  // Check if collectionSecret is provided
  if (!collectionSecret) {
    collectionSecret =
      (await getEnv('NEXT_PUBLIC_TEAMPILOT_COLLECTION_SECRET')) ||
      (await getEnv('TEAMPILOT_COLLECTION_SECRET'))
  }
  if (!collectionSecret) {
    throw new Error(
      'Provide a collectionSecret in the function call or in the environment variables via TEAMPILOT_COLLECTION_SECRET or NEXT_PUBLIC_TEAMPILOT_COLLECTION_SECRET'
    )
  }

  // Get Collection Info
  const getInfo = async ({ cache }: { cache?: RequestCache } = {}) => {
    const params = new URLSearchParams({
      collectionSecret: collectionSecret!,
    })
    const response = await fetch(`${urlInfo}?${params}`, {
      cache,
    })
    if (!response.ok) {
      throw new Error(`Error getting collection info: ${await response.text()}`)
    }
    const schema = z.object({
      id: z.string(),
      name: z.string(),
      itemCount: z.number(),
      url: z.string(),
    })
    const parsed = schema.parse(await response.json())
    return parsed
  }

  // Upsert Items
  const upsertItems = async ({
    items,
  }: {
    items: {
      id?: string
      text: string
      metadata?: z.infer<T>
    }[]
  }) => {
    const schema = z.object({
      id: z.string().optional(),
      text: z.string(),
      metadata: metadataSchema,
    })
    const parsed = items.map((item) => schema.parse(item))
    const response = await fetch(urlItems, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collectionSecret,
        items: parsed,
      }),
      cache: 'no-cache',
    })
    if (!response.ok) {
      throw new Error(`Upserting items failed: ${await response.text()}`)
    }
    const json = await response.json()
    const responseSchema = z.object({
      items: z.array(z.object({ id: z.string() })),
    })
    return responseSchema.parse(json)
  }

  // Search Items
  const searchItems = async ({
    searchQuery,
    limit,
    cache,
  }: {
    searchQuery: string
    limit?: number
    cache?: RequestCache
  }) => {
    const params = new URLSearchParams({
      collectionSecret: collectionSecret!,
      searchQuery,
    })
    if (limit) {
      params.set('limit', `${limit}`)
    }
    const response = await fetch(`${urlItems}?${params}`, {
      cache,
    })
    if (!response.ok) {
      throw new Error(`Searching items failed: ${await response.text()}`)
    }
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
    const parsed = schema.parse(await response.json())
    return parsed
  }

  const deleteOne = async ({ itemId }: { itemId: string }) => {
    const params = new URLSearchParams({
      collectionSecret: collectionSecret!,
      itemId,
    })
    const response = await fetch(`${urlItems}?${params}`, {
      method: 'DELETE',
      cache: 'no-cache',
    })
    if (!response.ok) {
      throw new Error(`Deleting item failed: ${await response.text()}`)
    }
  }

  const deleteAll = async () => {
    const params = new URLSearchParams({
      collectionSecret: collectionSecret!,
      allItems: 'true',
    })
    const response = await fetch(`${urlItems}?${params}`, {
      method: 'DELETE',
      cache: 'no-cache',
    })
    if (!response.ok) {
      throw new Error(`Deleting all items failed: ${await response.text()}`)
    }
  }

  return {
    getInfo,
    upsertItems,
    searchItems,
    deleteOne,
    deleteAll,
  }
}
