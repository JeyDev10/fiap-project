"use client"
import { useEffect, useState } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  const handleWindowResize = () => {
    setIsMobile(window.innerWidth <= 1024)
  }

  useEffect(() => {
    setIsMobile(window.innerWidth <= 1024)
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])
  return isMobile
}
