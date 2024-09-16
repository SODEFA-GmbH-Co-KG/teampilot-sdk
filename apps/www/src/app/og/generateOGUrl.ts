export const generateOgUrl = ({ title }: { title: string }) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/og?title=${title}`
}
