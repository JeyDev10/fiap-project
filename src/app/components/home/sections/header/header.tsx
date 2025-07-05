"use client"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(SplitText)

import "./header.scss"

export function HeaderSection() {
  useGSAP(() => {
    gsap.set(".header-paragraph span", { opacity: 1 })
    let split = SplitText.create(".header-paragraph span", {
      type: "words",
      aria: "hidden"
    })

    gsap.from(split.words, {
      opacity: 0,
      duration: 2,
      ease: "sine.out",
      stagger: 0.1
    })
  })

  return (
    <section className="header-section">
      <p className="header-paragraph">
        <span>A Melhor Faculdade</span>
        <span>de Tecnologia</span>
      </p>
      <p className="background-text">SOBRE</p>
    </section>
  )
}
