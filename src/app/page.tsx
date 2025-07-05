"use client"

import {
  HeaderSection,
  IntroSection,
  WaterSection,
  CoursesSection,
  FAQSection
} from "@/app/components/home"

import { useIsMobile } from "@/app/hooks/useIsMobile"

import "@/app/page.scss"

export default function Home() {
  const isMobile = useIsMobile()

  return (
    <div>
      <HeaderSection />
      <IntroSection />
      {!isMobile && <WaterSection />}
      <CoursesSection />
      <FAQSection />
    </div>
  )
}
