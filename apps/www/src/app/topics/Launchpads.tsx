import { type PropsWithChildren } from "react"
import remarkGfm from "remark-gfm"
import { AnchorDiv } from "~/client/AnchorDiv"
import { CodeBlock } from "~/client/CodeBlock"
import ReactMarkdown from "~/client/CustomReactMarkdown"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { getIdForTopic } from "~/utils/navTopics"
import { WidgetShowcase } from "./WidgetShowcase"

const tableComponents = {
  table: ({ children }: PropsWithChildren) => (
    <table className="table-fixed">{children}</table>
  ),
  td: ({ children }: PropsWithChildren) => (
    <td style={{ wordWrap: "break-word" }}>{children}</td>
  ),
}

export const Launchpads = () => {
  const launchpadsId = getIdForTopic({
    secondLevelSlug: "#launchpads",
  })
  const whatAreLaunchpadsId = getIdForTopic({
    secondLevelSlug: "#launchpads",
    thirdLevelSlug: "-what-are-launchpads",
  })
  const widgetId = getIdForTopic({
    secondLevelSlug: "#launchpads",
    thirdLevelSlug: "-widget",
  })

  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <IntersectionChecker topic={"/topics#launchpads"} />
      <AnchorDiv id={launchpadsId} />
      <ReactMarkdown>{`
# Understanding Launchpads in Teampilot

Launchpads are a fundamental element in integrating teampilot into your product. They serve as a collection of settings that provide instructions for the AI's behavior, its functionality, and data access.
`}</ReactMarkdown>
      <IntersectionChecker topic={`/topics#${whatAreLaunchpadsId}`} />
      <AnchorDiv id={whatAreLaunchpadsId} />
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
      <IntersectionChecker topic={`/topics#${widgetId}`} />
      <AnchorDiv id={widgetId} />
      <ReactMarkdown>{`
## Widget

The Teampilot Widget lets you embed an AI chatbot directly into your website. It renders as a floating chat bubble that opens an iframe-based chat interface. The widget is loaded via a single script tag and can be fully customized and controlled via JavaScript.
`}</ReactMarkdown>

      <h3>Basic Setup</h3>
      <CodeBlock
        language="html"
        lightMode="dark"
        value={`<script
  defer
  src="https://teampilot.ai/widget.js"
  data-launchpad-slug-id="your-launchpad-slug-id"
/>`}
      />

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={tableComponents}
      >
        {`
### Script Tag Attributes

| Attribute | Default | Description | Required |
| --- | --- | --- | --- |
| \`data-launchpad-slug-id\` | | The public launchpad's slug identifier | Yes |
| \`data-icon-bg\` | \`#F55E00\` | Background color of the floating chat bubble | No |
| \`data-icon-color\` | \`#FFFFFF\` | Icon color of the floating chat bubble | No |
| \`data-primary-color\` | | Primary color applied to the widget UI | No |
| \`data-hide-bubble\` | | When present, hides the floating chat bubble. Useful when triggering the chat via custom UI elements | No |
| \`data-remember-chatroom\` | \`true\` | When \`true\`, stores the chatroom ID in localStorage and reopens it on return visits | No |
| \`data-open-after-reload\` | \`true\` | When \`true\`, remembers the open/closed state and restores it after page reload | No |
| \`data-iframe-style\` | | Custom CSS inline styles applied to the iframe element (e.g. \`"border: 2px solid orange;"\`) | No |
| \`data-custom-style\` | | Custom CSS rules injected inside the widget (e.g. \`".text-lg { color: orange; }"\`) | No |
`}
      </ReactMarkdown>

      <ReactMarkdown>{`
### JavaScript API

After the widget script loads, a global \`window.teampilot\` object is available with the following methods:
`}</ReactMarkdown>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={tableComponents}
      >
        {`
#### Control Methods

| Method | Description |
| --- | --- |
| \`showChat()\` | Shows the chat widget. Creates the iframe on first call (lazy loading). |
| \`hideChat()\` | Hides the chat widget. |
| \`createNewChatroom()\` | Resets the chat and creates a new chatroom. |
| \`sendMessage({ message })\` | Sends a user message to the chat. Automatically opens the widget if hidden. |
| \`waitForChatroomLoaded()\` | Returns a Promise that resolves when the chatroom is fully loaded. |

#### Custom Function Methods

| Method | Description |
| --- | --- |
| \`registerFunction(fn)\` | Registers a custom function that the AI can call. See the example below. |
| \`unregisterFunction(name)\` | Removes a previously registered custom function by its \`nameForAI\`. |

#### Styling Methods

| Method | Description |
| --- | --- |
| \`setCustomStyle({ style })\` | Injects custom CSS into the widget at runtime. |

#### Event Methods

| Method | Description |
| --- | --- |
| \`on(event, callback)\` | Registers a listener for a widget event. |
| \`off(event, callback)\` | Removes a previously registered event listener. |
`}
      </ReactMarkdown>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={tableComponents}
      >
        {`
### Events

| Event | Data | Description |
| --- | --- | --- |
| \`chatroomLoaded\` | \`{ chatroomId: string }\` | Fired when the chatroom finishes loading. |
| \`newChat\` | — | Fired when the user starts a new chat. |
| \`closeChat\` | — | Fired when the user closes the chat widget. |
| \`navigate\` | \`{ url: string, target: string }\` | Fired when the widget needs to navigate (e.g. link click inside chat). |
`}
      </ReactMarkdown>

      <h3>Full Example</h3>
      <CodeBlock
        language="html"
        lightMode="dark"
        value={`<script
  defer
  src="https://teampilot.ai/widget.js"
  data-launchpad-slug-id="your-launchpad-slug-id"
  data-icon-bg="#508090"
  data-primary-color="#508090"
  data-remember-chatroom="true"
/>

<script>
  // Open widget with a custom button
  document.getElementById('chat-btn')
    .addEventListener('click', () => {
      window.teampilot.showChat()
    })

  // Listen for events
  window.teampilot.on('chatroomLoaded', (data) => {
    console.log('Chatroom ready:', data.chatroomId)
  })

  // Send a message programmatically
  window.teampilot.sendMessage({ message: 'Hello!' })
</script>`}
      />

      <ReactMarkdown>{`
### SDK Wrapper

When using the \`@teampilot/sdk\` package, you can use the typed \`teampilotWidget\` wrapper instead of accessing \`window.teampilot\` directly. See the [API Reference](/sdk-docs#api-reference-teampilot-widget) for details.
`}</ReactMarkdown>

      <h3>Interactive Example</h3>
      <WidgetShowcase />
    </div>
  )
}
