"use client"
import { useIntersectionObserver } from "@uidotdev/usehooks"
import { useEffect } from "react"
import { useNavigationContext } from "./NavigationContext"

export const IntersectionChecker = ({ topic }: { topic: string }) => {
  const { setSelectedTopic } = useNavigationContext()
  const [ref, entry] = useIntersectionObserver({
    threshold: 1,
    root: null,
    rootMargin: "0px 0px -50% 0px",
  })
  useEffect(() => {
    if (entry?.isIntersecting) {
      setSelectedTopic(topic)
    }
  }, [entry, setSelectedTopic, topic])
  return <div ref={ref}></div>
}
