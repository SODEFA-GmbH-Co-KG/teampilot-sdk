import ReactMarkdown from "react-markdown"
import { DocsLinksGrid } from "~/client/DocsLink"
const markdown = `
# **Welcome to Teampilot**

Teampilot is like ChatGPT, but it comes with more cool stuff like documents, functions, and multiplayer features. 

## What can I do with the Teampilot SDK?
The Teampilot SDK can be broken down into 2 parts:
**Integrate Teampilot into your product** and **Integrate your product into Teampilot**

## Integrate Teampilot into your product
This means using Teampilot AI to programmatically generate text, data or media, with Teampilot, that you can easily integrate into your product.
For example you could use Teampilot to generate a text for your web page or generate images for your blog posts.

## Integrate your product into Teampilot
In Teampilot, there are things called **functions**. Functions are like small programs that Teampilot can use. For example, GPT isn't good at maths, so there's a function called **calculator** that GPT can use to do the math. Or a function that can visit a website.

With the Teampilot SDK, you can create and connect your own functions to Teampilot. So, for example, you could make a function that can get user data from your database and give it to Teampilot. Then, your Support team could ask Teampilot when a user named "John Doh" last paid. Teampilot would then call your function, your function would find the data from your database and give it back to Teampilot. Teampilot would then answer the question using the info from your function.
`

export default function Page() {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <ReactMarkdown className="w-full">{markdown}</ReactMarkdown>

      <DocsLinksGrid destinations={["/teampilot-into-your-product"]} />
    </div>
  )
}
