import { ReactMarkdownWithCode } from "~/client/ReactMarkdownWithCode"

const markdown = `
# Provide a Public Launchpad

The fastest way to get started with Teampilot is to provide a public launchpad. This is our no-code solution that allows you to enable generative AI for your use case in minutes.

## What is a Public Launchpad?

A public launchpad is similar to the well known Custom GPT's from OpenAI. Once created it can be made accessible via a public URL and can be used by anyone.
At its core it is providing a Chat UI to interact with the configured AI. You can learn more about launchpads in the [Launchpads](/topics#launchpads) section. 

## Let's setup a Public Launchpad for an actual use case

Lets's say you want to provide a simple Vim Tutor for your team that can generate small Vim lessons on the fly to keep your teams Vim skills sharp, without your team needing to signup themselves on Teampilot.

1. Create an account on [Teampilot](https://teampilot.ai) if not already done.
2. Create a team if not already done.
3. Navigate to the Launchpads section and click the \`+\` button. ![Add a Launchpad](/docs/add-launchpad.png)
4. Choose a name and a description for your launchpad. Both do not have any effect on the AI but are for your internal reference. ![Name and Description](/docs/fill-name-description.png)
5. Set an Assistant Greeting. This is the initial message that will show up to the user. ![Assistant Greeting](/docs/assistant-greeting.png)
6. Configure a set of initial recommended messages that will be shown to the user for a fast first interaction. Recommendations have to be seperated by a new line to be recognized. ![Initial Messages](/docs/first-recommendations.png)
7. Configure a spending limit for the launchpad if you like. If nothing is entered here, the budget will be unlimited. But you can keep track of the spent amount by looking at the count above the input. ![Spending Limit](/docs/spending-limit.png)
8. Change the switch to public. ![Public Switch](/docs/public-switch.png)
9. To make the AI behave the way we want, we need to enter an appropriate system message. Therefore we click on the \`Add\` button at the bottom and select \`System Message\`. ![Add System Message](/docs/add-system-message.png)
10. In the dialog that opens we enter the following message: 
\`\`\`
Generate a *knowledge*-level Vim lesson on *topic*. 
The lesson should include necessary Vim commands, 
the count of these commands, a sample code block 
in Javascript using Next.js framework, and step-by-step 
instructions to complete the lesson. The lesson 
should be suitable for the vim extension in the 
monaco web editor. So, things like closing vim and 
writing to files do not apply. Consider this as you 
design the lessons.

*knowledge* is a placeholder for: beginner, intermediate, expert.
*topic* is a placeholder for the topic that the lesson should be generated for. 

If not given, ask the user for the necessary information to generate the lesson.
\`\`\` 
![System Message](/docs/system-message.png)
11. We then choose our base model that should handle the user requests by clicking on the bottom right button. In this case we choose the GPT-4-Turbo model. ![Base Model](/docs/base-model.png)
12. Finally we hit \`Save\` followed by \`Launch\` to save and see our launchpad in action. You can now copy and share the URL from step 8 with your team.

## Example output

![Example Output](/docs/example-output.png)

## Extend your Launchpad further

You can extend your launchpad further by adding custom functions, documents, and more. You can learn more about these in the [Topics](/topics) section.
`

export default function Page() {
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <ReactMarkdownWithCode>{markdown}</ReactMarkdownWithCode>
    </div>
  )
}
