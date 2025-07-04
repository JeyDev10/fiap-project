import { useRef } from "react"
import Image from "next/image"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import "./intro.scss"

gsap.registerPlugin(ScrollTrigger)

export function IntroSection() {
  const imageContainerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Animations for intro first texts
    gsap.to(".text-slide-left", {
      xPercent: -100,
      duration: 15,
      ease: "linear",
      repeat: -1
    })

    gsap.fromTo(
      ".text-slide-right",
      {
        xPercent: -100
      },
      {
        xPercent: 0,
        duration: 10,
        ease: "linear",
        repeat: -1
      }
    )
  })

  useGSAP(
    () => {
      const slideToLeftAnimation = gsap.to(".image-text-slide-left", {
        xPercent: -100,
        duration: 10,
        ease: "linear",
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.wrap(-100, 100)
        }
      })

      const slideToRightAnimation = gsap.fromTo(
        ".image-text-slide-right",
        {
          xPercent: -100
        },
        {
          xPercent: 0,
          duration: 15,
          ease: "linear",
          repeat: -1
        }
      )

      ScrollTrigger.create({
        trigger: imageContainerRef.current,
        start: "top bottom",
        end: "bottom top"
      })

      ScrollTrigger.addEventListener("scrollStart", function () {
        slideToLeftAnimation.timeScale(2.5)
        slideToRightAnimation.timeScale(2.5)
      })
      ScrollTrigger.addEventListener("scrollEnd", function () {
        slideToLeftAnimation.timeScale(1)
        slideToRightAnimation.timeScale(1)
      })

      gsap.to(".image-reveal-container", {
        scrollTrigger: imageContainerRef.current,
        yPercent: 200,
        duration: 8,
        ease: "power3.out",
        toggleActions: "play none none reverse"
      })
    },
    { scope: imageContainerRef }
  )

  return (
    <section className="intro-section">
      <div className="slide-container">
        <p className="text-slide-left">
          CURSOS E IMERSÕES. UMA NOVA CULTURA DE MERCADO. CURSOS E IMERSÕES. UMA
          NOVA CULTURA DE MERCADO.
        </p>
        <p className="text-slide-left">
          CURSOS E IMERSÕES. UMA NOVA CULTURA DE MERCADO. CURSOS E IMERSÕES. UMA
          NOVA CULTURA DE MERCADO.
        </p>
      </div>
      <div className="slide-container">
        <p className="text-slide-right">
          TECNOLOGIA, INOVAÇÃO E NEGÓCIOS. PRESENTE E FUTURO.
        </p>
        <p className="text-slide-right">
          TECNOLOGIA, INOVAÇÃO E NEGÓCIOS. PRESENTE E FUTURO.
        </p>
      </div>

      <div ref={imageContainerRef} className="image-container">
        <div className="image-reveal-section">
          <div className="image-reveal-container"></div>
          <Image
            className="intro-image"
            src="/imgs/intro.png"
            alt="Fiap Campus"
            width={1495}
            height={804}
          />
        </div>

        <div className="image-texts-container">
          <div className="image-text-slide">
            <p className="image-text-slide-left">CONHECIMENTO ○ SKILLS ○ </p>
            <p className="image-text-slide-left">CONHECIMENTO ○ SKILLS ○</p>
          </div>
          <div className="image-text-slide">
            <p className="image-text-slide-right">
              MUITO. MUITO ALÉM DOS TUTORIAIS MUITO. MUITO ALÉM DOS TUTORIAIS
            </p>
            <p className="image-text-slide-right">
              MUITO. MUITO ALÉM DOS TUTORIAIS MUITO. MUITO ALÉM DOS TUTORIAIS
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
