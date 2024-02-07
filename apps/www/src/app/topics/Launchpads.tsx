import ReactMarkdown from "react-markdown"
import { AnchorDiv } from "~/client/AnchorDiv"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { getIdForTopic } from "~/utils/navTopics"

export const Launchpads = () => {
  const launchpadsId = getIdForTopic({
    secondLevelSlug: "#launchpads",
  })

  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <IntersectionChecker topic={"/topics#launchpads"} />
      <AnchorDiv id={launchpadsId} />
      <ReactMarkdown>{`
# Understanding Launchpads in Teampilot

Launchpads are a fundamental element in integrating teampilot into your product. They serve as a collection of settings that provide instructions for the AI's behavior, its functionality, and data access.
`}</ReactMarkdown>
      <ReactMarkdown>{`
## What are Launchpads?

In Teampilot, you can have multiple chats. Each chat is composed of messages and settings. These settings include the GPT version to be used, the system prompt that guides the AI's behavior, available functions, accessible documents, etc.

A launchpad is a set of these settings. When you create a new chat using a launchpad, the chat automatically adopts the settings defined in the launchpad. For instance, a launchpad with the settings "GPT-4" and "System Prompt: Keep your answers short" will create a chat with these exact settings.

Launchpads serve two main purposes:

1. They provide a template for creating new chats in the Teampilot App, making the process easier and faster.
2. They are the backbone of the SDK. Whenever you fetch data from Teampilot via the SDK, you need to specify a launchpad that should be used to generate your output.

## Creating Your First Launchpad

Follow these steps to create your first launchpad:

1. **Create a Teampilot Account:** If you don't have one already, register at [https://teampilot.ai/](https://teampilot.ai/).
2. **Create a Teampilot Team:** Create a team if you don't have one.
3. **Access Launchpads:** Click the menu on the top left and select "Launchpads".
4. **Create a New Launchpad:** Click on "Create Launchpad" and configure it according to your needs. (Configuring is not necessary to get started)
5. **Activate the 'Public' Switch:** This step allows the SDK to generate new chats from this launchpad.
6. **Save Your Settings:** Click "Save" at the bottom right of the page.
7. **Copy the ID:** After saving, an ID will appear below the "Public" switch. Copy this ID for future use. (If you don't need it right away, you can always come back to this page and copy it again)

Congratulations! You've successfully created your first launchpad. You can now use it to create new chats via the SDK.

Also checkout our [Getting Started](/getting-started/provide-a-public-launchpad) guide to setup a public launchpad step by step for an actual use case.
`}</ReactMarkdown>
    </div>
  )
}
