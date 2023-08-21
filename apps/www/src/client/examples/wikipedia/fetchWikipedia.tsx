export async function fetchWikipediaArticle(articleTitle: string) {
  let url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${articleTitle}`

  // Fetch data from Wikipedia
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Api-User-Agent": "Example/1.0",
    },
  })

  // Check if request was successful
  if (response.ok) {
    let data = await response.json()
    let pages = data.query.pages
    let page = Object.values(pages)[0] as any
    return page.extract
  } else {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
}

// Use the function
fetchWikipediaArticle("JavaScript")
  .then((content) => console.log(content))
  .catch((e) => console.error(e))
