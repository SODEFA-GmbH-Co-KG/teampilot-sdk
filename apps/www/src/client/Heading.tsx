import slugify from "slugify"

export const Heading = ({ children }: { children: string }) => {
  const slug = slugify(children, { lower: true, strict: true })
  return (
    <>
      <h1
        id={slug}
        className="group scroll-m-20 text-4xl font-bold tracking-tight"
      >
        {children}
      </h1>
    </>
  )
}
