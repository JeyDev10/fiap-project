import { useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import "./courses.scss"

export function CoursesSection() {
  const [currentCourse, setCurrentCourse] = useState("tecnologia")

  const { contextSafe } = useGSAP()

  const handleCourseClick = contextSafe((course: string) => {
    // if (course === currentCourse) return

    gsap.to(`.${currentCourse}-trace`, {
      width: 50,
      duration: 0.5,
      ease: "power2.inOut"
    })

    const tl = gsap.timeline()

    gsap.utils
      .toArray([".courses-content span", ".courses-content ul li"])
      .forEach((el) => {
        tl.to(el as HTMLElement, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            // if (el instanceof HTMLElement) {
            //   el.style.display = "none"
            // }
          }
        })
      })
  })

  return (
    <section className="courses-section">
      <div className="courses-header">
        <div className="title-section">
          <h2 className="courses-title">Cursos</h2>
          <h3 className="courses-subtitle">Cursos de Curta Duração</h3>
        </div>
        <nav className="courses-nav">
          <ul>
            <li>
              <div className="animation-trace tecnologia-trace"></div>
              <span onClick={() => handleCourseClick("tecnologia")}>
                TECNOLOGIA
              </span>
            </li>
            <li>
              <div className="animation-trace inovacao-trace"></div>
              <span>INOVAÇÃO</span>
            </li>
            <li>
              <div className="animation-trace negocios-trace"></div>
              <span>NEGÓCIOS</span>
            </li>
          </ul>
        </nav>
      </div>

      <div className="courses-content">
        <span className="courses-content-title">Tecnologia</span>
        <ul>
          <li>Big Data Ecosystem</li>
          <li>Creating Dashboards for BI</li>
          <li>Big Data Science - Machine Learning & Data Mining</li>
          <li>Storytelling</li>
        </ul>
      </div>
    </section>
  )
}
