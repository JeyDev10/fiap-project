"use client"

import {
  HeaderSection,
  IntroSection,
  WaterSection,
  CoursesSection
} from "@/app/components/home"

import "@/app/page.scss"

export default function Home() {
  return (
    <div>
      <HeaderSection />
      <IntroSection />
      <WaterSection />
      <CoursesSection />
    </div>
  )
}
