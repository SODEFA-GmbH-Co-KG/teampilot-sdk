import ReactMarkdown from "react-markdown"
import { DocsLinksGrid, getPageByHref } from "~/client/DocsLink"
const markdown = `
# **Welcome to Teampilot**

Teampilot is a powerful conversational AI platform, akin to ChatGPT, but packed with additional features like document management, built-in functions, and multiplayer capabilities. 

## Exploring the Teampilot SDK

The Teampilot SDK serves two main functions: 
1. **[Integrating Teampilot into Your Product](${
  getPageByHref("/teampilot-into-your-product")?.href
})**
2. **[Integrating Your Product into Teampilot](${
  getPageByHref("/your-product-into-teampilot")?.href
})**

Let's delve deeper into each one of these.

## Integrating Teampilot into Your Product

This aspect of the SDK allows you to harness the power of Teampilot's AI to programmatically generate content like text, data, or media. This content can then be seamlessly integrated into your product. For instance, you have the ability to use Teampilot to generate text for your web page or to create bespoke images for your blog posts.

## Integrating Your Product into Teampilot

Within Teampilot, there are features known as [**functions**](${
  getPageByHref("/functions")?.href
}). These functions operate like mini-programs that Teampilot can utilize to extend its capabilities. To illustrate, GPT might not excel at mathematical calculations, so a function named **calculator** is available for GPT to perform such tasks. Another function could be designed to visit specific websites.

The Teampilot SDK empowers you to create and connect your unique functions to Teampilot. For example, you could develop a function capable of pulling user data from your database and providing it to Teampilot. This means that when anyone within your team asks Teampilot a question related to user data, Teampilot can call the function, the function then fetches the relevant data from your database and feeds it back to Teampilot, which then formulates the answer using the fetched data.

The possibilities are endless with what kind of functions you can develop and integrate. The goal here is to simplify workflows, improve efficiency, and make information retrieval as intuitive as possible. Begin experimenting with the SDK, create [custom functions](${
  getPageByHref("/custom-functions")?.href
}), and leverage Teampilot to reinforce your product's capabilities.`

export default function Page() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown className="w-full">{markdown}</ReactMarkdown>

      <DocsLinksGrid
        destinations={[
          "/teampilot-into-your-product",
          "/your-product-into-teampilot",
        ]}
      />
    </div>
  )
}
