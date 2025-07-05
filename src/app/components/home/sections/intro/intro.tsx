import { useRef } from "react"
import Image from "next/image"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useIsMobile } from "@/app/hooks/useIsMobile"

import "./intro.scss"

gsap.registerPlugin(ScrollTrigger)

export function IntroSection() {
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useGSAP(function handdleFirstTextAnimation() {
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
    function handleImageTransition() {
      gsap.to(".image-reveal-transition-panel", {
        scrollTrigger: {
          trigger: imageContainerRef.current,
          once: true
        },
        yPercent: 300,
        duration: 5,
        ease: "power3.out",
        toggleActions: "play none none reverse"
      })
    },
    { scope: imageContainerRef, dependencies: [window.innerWidth] }
  )

  useGSAP(
    function handleSecondTextAnimation() {
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
        end: "bottom top",
        onUpdate: (self) => {
          if (self.direction === 1) {
            slideToLeftAnimation.reversed(false)
            slideToRightAnimation.reversed(false)
          } else {
            slideToLeftAnimation.reversed(true)
            slideToRightAnimation.reversed(true)
          }
        }
      })

      ScrollTrigger.addEventListener("scrollStart", function () {
        slideToLeftAnimation.timeScale(
          slideToLeftAnimation.reversed() ? -2.3 : 2.3
        )
        slideToRightAnimation.timeScale(
          slideToRightAnimation.reversed() ? -2.3 : 2.3
        )
      })
      ScrollTrigger.addEventListener("scrollEnd", function () {
        slideToLeftAnimation.timeScale(slideToLeftAnimation.reversed() ? -1 : 1)
        slideToRightAnimation.timeScale(
          slideToRightAnimation.reversed() ? -1 : 1
        )
      })
    },
    { scope: imageContainerRef, dependencies: [window.innerWidth] }
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
      {!isMobile && (
        <div ref={imageContainerRef} className="image-container">
          <div className="image-reveal-container">
            <div className="image-reveal-transition-panel" />
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
              <p className="image-text-slide-left">
                CONHECIMENTO
                <Image
                  src="svgs/ellipse.svg"
                  alt="ellipse to split texts"
                  width={38}
                  height={38}
                />
                SKILLS
                <Image
                  src="svgs/ellipse.svg"
                  alt="ellipse to split texts"
                  width={38}
                  height={38}
                />
              </p>
              <p className="image-text-slide-left">
                CONHECIMENTO
                <Image
                  src="svgs/ellipse.svg"
                  alt="ellipse to split texts"
                  width={38}
                  height={38}
                />
                SKILLS
                <Image
                  src="svgs/ellipse.svg"
                  alt="ellipse to split texts"
                  width={38}
                  height={38}
                />
              </p>
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
      )}
    </section>
  )
}
