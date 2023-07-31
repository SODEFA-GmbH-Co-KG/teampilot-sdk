import Image from "next/image"
import { ShowCase } from "~/client/ShowCase"
import sidebar from "../../../public/examples/sidebar.png"

export default function Page() {
  return (
    <>
      <ShowCase
        title="A New way to write code"
        file="/src/client/examples/future/Sidebar.tsx"
        layout="side-by-side"
      >
        <Image src={sidebar} alt="Sidebar" />
      </ShowCase>
    </>
  )
}
