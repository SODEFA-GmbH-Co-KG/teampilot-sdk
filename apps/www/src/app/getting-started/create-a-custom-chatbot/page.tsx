import Script from "next/script"
import ReactMarkdown from "react-markdown"

const markdown = `
# Create a Custom Chatbot

Teampilot AI provides a simple way to integrate AI into your product. With only a few configuration steps and a small snippet that has to be embedded on your webpage, you can you can bring the power of AI to your users in under 10 minutes.
Lets assume you have a SaaS product and you want to provide a chatbot to your users to help them with their questions. This guide will show you how to create a custom chatbot for your product.

1. Create an account on [Teampilot](https://teampilot.ai) if not already done.
2. Create a team if not already done.
3. Navigate to the Launchpads section and click the \`+\` button. ![Add a Launchpad](/docs/add-launchpad.png)
4. Fill out the form with the following information: ![Chatbot Launchpad](/docs/chatbot-launchpad.png) Name and Description can be anything you like. The Assistant Greeting is the first message the user will see when opening the chat. The Initial Messages are a set of recommended messages that will be shown to the user for a fast first interaction.
5. Configure a spending limit for the launchpad if you like. If nothing is entered here, the budget will be unlimited. But you can keep track of the spent amount by looking at the count above the input. ![Chatbot Spending Limit](/docs/spending-limit.png)
6. Set the switch to public. ![Chatbot Public Switch](/docs/chatbot-public-switch.png) You will need to copy the value from the Widget field later to embed it on your webpage.
7. Know we want to configure the Chatbots knowledge : Click the \`+\` button  and select \`System Message\`. ![Add System Message](/docs/add-system-message.png) In the dialog that opens we enter the following message:
\`\`\`
What is Teampilot AI?
Teampilot AI is a versatile tool that leverages advanced AI models to assist users 
and Teams in a wide range of tasks. It includes features like Chat Pilot for general 
assistance, Image Pilot for generating images from text descriptions, Speech-to-Text 
and Text-to-Speech for voice interactions, Crawl Pilot for web crawling, Knowledge 
Pilot for document-based discussions, and Search Pilot for web-based inquiries.

How is Teampilot AI different than ChatGPT by OpenAI?
While both Teampilot AI and ChatGPT by OpenAI use advanced AI models for assistance,
Teampilot AI offers a wider range of features and focuses on using these features in
a Team environment. In addition to general chat assistance, Teampilot AI includes
capabilities for image generation, voice interactions, web crawling, document-based
discussions, and web-based inquiries. This makes Teampilot AI a more comprehensive
tool for various tasks.

How do I get started with Teampilot AI?
Just sign up for an account and start using Teampilot AI right away! You can use the 
Chat Pilot feature to get started, or you can explore the other features to see what 
Teampilot AI has to offer. The Free Plan allows you to use all of the features in a 
limited way, but you can also upgrade to a paid plan for more advanced features and 
capabilities.
\`\`\`
8. We then choose our base model that should handle the user requests by clicking on the bottom right button. In this case we choose the GPT-4-Turbo model. ![Chatbot Base Model](/docs/base-model.png)
9. To test the launchpad before embedding it on your webpage, click on the bottom right button to save and launch the launchpad.
10. Copy the Widget value and embed it on your webpage. To embded the chatbot on this page here, we just added the snippet to our nextjs page using the next/script component like so:
\`\`\`tsx
export default function Page() {
  return (
    <>
      <Script
        defer
        src="https://teampilot.ai/widget.js"
        data-launchpad-slug-id="my-chatbot-674ea0f69899a7db7dd6c995fc113cf6"
      />
      <div className="prose max-w-[inherit] dark:prose-invert">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </>
  )
}
\`\`\`
11. To test the outcome of this Getting Started tutorial, just click the orange chat bubble in the bottom right corner of this page.

## Extend your Chatbot further

You can extend your chatbot further by adding custom functions, documents, and more, you can learn more about these in the [Topics](/topics) section.
`

export default function Page() {
  return (
    <>
      <Script
        defer
        src="https://teampilot.ai/widget.js"
        data-launchpad-slug-id="my-chatbot-20ee457cee3b099cca3b762da5ca7105"
      />
      <div className="prose max-w-[inherit] dark:prose-invert">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </>
  )
}
