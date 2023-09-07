import { z } from "zod"

export async function fetchWikipediaArticle(articleTitle: string) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${articleTitle}`

  // Fetch data from Wikipedia
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Api-User-Agent": "Example/1.0",
    },
  })

  // Check if request was successful
  if (response.ok) {
    const json = await response.json()

    const data = z
      .object({
        query: z.object({
          pages: z.record(
            z.object({
              extract: z.string(),
            })
          ),
        }),
      })
      .parse(json)

    const pages = data.query.pages
    const page = Object.values(pages)[0]
    return page?.extract
  } else {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
}
