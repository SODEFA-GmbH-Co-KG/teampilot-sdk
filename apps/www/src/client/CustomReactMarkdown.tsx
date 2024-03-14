import RawReactMarkdown from "react-markdown"

export default function ReactMarkdown(
  props: Parameters<typeof RawReactMarkdown>[0]
) {
  return (
    <RawReactMarkdown
      {...props}
      components={{
        img: ({ src, alt, title }) => {
          return (
            <img
              alt={alt}
              src={src}
              title={title}
              style={{ maxWidth: "100%" }}
            />
          )
        },
        table: ({ children }) => (
          <table className="table-fixed">{children}</table>
        ),
        td: ({ children }) => (
          <td className="" style={{ wordWrap: "break-word" }}>
            {children}
          </td>
        ),
      }}
    />
  )
}
