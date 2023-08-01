import { TodoApp } from "~/client/examples/TodoApp/TodoApp"
import { ShowCase } from "~/client/ShowCase"

export default function Page() {
  return (
    <>
      <ShowCase
        title="Todo App"
        file="/src/client/examples/TodoApp/TodoApp.tsx"
      >
        <TodoApp />
      </ShowCase>
    </>
  )
}
