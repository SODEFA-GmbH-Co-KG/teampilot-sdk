import { use } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/shadcn/components/ui/card"
import { teampilot } from "~/teampilot"

export const MultipleAssistants = () => {
  const defaultAnswer = use(
    teampilot.default.fetchText({
      message: "Describe Teampilot in one sentence",
    })
  )
  const expertAnswer = use(
    teampilot.sdkExpert.fetchText({
      message: "Describe Teampilot in one sentence",
    })
  )
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Default</CardTitle>
        </CardHeader>
        <CardContent>{defaultAnswer}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>SDK Expert</CardTitle>
        </CardHeader>
        <CardContent>{expertAnswer}</CardContent>
      </Card>
    </>
  )
}
