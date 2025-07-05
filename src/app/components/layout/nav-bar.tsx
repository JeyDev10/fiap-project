"use client"
import Image from "next/image"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import "./nav-bar.scss"

gsap.registerPlugin(ScrollTrigger)

export function NavBar() {
  useGSAP(() => {
    ScrollTrigger.addEventListener("scrollStart", function () {
      gsap.to([".nav-bar"], {
        backgroundColor: "#202121",
        duration: 0.3,
        ease: "linear"
      })
      gsap.to("progress", {
        opacity: 1,
        duration: 0.5,
        ease: "power3.in"
      })
    })

    gsap.to("progress", {
      value: 100,
      ease: "none",
      scrollTrigger: { scrub: 0.1 }
    })
  })

  return (
    <nav className="nav-bar">
      <Image src="/svgs/logo-fiap.svg" alt="Fiap logo" width={84} height={23} />
      <progress max="100" value="0" />
    </nav>
  )
}
