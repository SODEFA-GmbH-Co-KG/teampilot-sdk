import Head from "next/head"
import { PersonSearch } from "~/client/PersonSearch"

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] last:text-white ">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Teampilot <span className="text-[hsl(280,100%,70%)]">AI</span> SDK
          </h1>
          <PersonSearch />
        </div>
      </main>
    </>
  )
}
