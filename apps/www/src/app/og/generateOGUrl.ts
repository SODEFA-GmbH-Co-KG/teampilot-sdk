export const generateOgUrl = ({ title }: { title: string }) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/og`)
  url.searchParams.set("title", title)

  return url.toString()
}
