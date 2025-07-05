"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import TextPlugin from "gsap/TextPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useIsMobile } from "@/app/hooks/useIsMobile"

import "./courses.scss"

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(TextPlugin)

type CourseType = "tecnologia" | "inovacao" | "negocios"
type CourseSubject = {
  name: string
  mode: string
}

type CourseMap = {
  title: string
  courses: CourseSubject[]
}

const courseContentMap: Record<CourseType, CourseMap> = {
  tecnologia: {
    title: "Tecnologia",
    courses: [
      {
        name: "Big Data Ecosystem",
        mode: "REMOTO • LIVE"
      },
      {
        name: "Creating Dashboards for BI",
        mode: "REMOTO • LIVE"
      },
      {
        name: "Big Data Science - Machine Learning & Data Mining",
        mode: "REMOTO • LIVE + MULTIMÍDIA"
      },
      { name: "Storytelling", mode: "REMOTO • LIVE" }
    ]
  },
  inovacao: {
    title: "Inovação",
    courses: [
      {
        name: "UX",
        mode: "DIGITAL"
      },
      {
        name: "UX Writing",
        mode: "LIVE"
      },
      {
        name: "Storytelling para Negócios",
        mode: "LIVE"
      },
      { name: "Chatbots", mode: "LIVE" }
    ]
  },
  negocios: {
    title: "Negócios",
    courses: [
      {
        name: "Agile Culture",
        mode: "DIGITAL"
      },
      {
        name: "DPO Data Protection Officer",
        mode: "LIVE"
      },
      {
        name: "Perícia Forense Computacional",
        mode: "LIVE"
      },
      { name: "Chatbots", mode: "LIVE" }
    ]
  }
}

export function CoursesSection() {
  const isMobile = useIsMobile()
  const [currentCourse, setCurrentCourse] = useState<undefined | CourseType>()

  const { contextSafe } = useGSAP()

  const tl = gsap.timeline()

  const onClickMobileButton = contextSafe((course: CourseType) => {
    const listContainer = document.querySelector(
      `.${course}-list`
    ) as HTMLElement
    const verticalButton = document.querySelector(
      `.${course}-expand-button .vertical-trace`
    ) as HTMLElement

    if (!listContainer) return

    gsap.to(`.${course}-list`, {
      maxHeight: listContainer.style.maxHeight === "700px" ? 0 : 700,
      duration: 0.5,
      ease: "power1.inOut"
    })

    gsap.to(`.${course}-expand-button .vertical-trace`, {
      height: verticalButton.style.height === "0px" ? "50%" : 0,
      opacity: 1,
      duration: 0.5,
      ease: "power1.inOut"
    })
  })

  const renderCourseslist = (course: CourseType) => (
    <>
      <div className="courses-title-container">
        <span className="courses-content-title">
          {courseContentMap[course].title}
        </span>
        {isMobile && (
          <div
            className={`${course}-expand-button expand-button`}
            onClick={() => onClickMobileButton(course)}
          >
            <span className="horizontal-trace"></span>
            <span className="vertical-trace"></span>
          </div>
        )}
      </div>

      <ul className={`${course}-list`}>
        {courseContentMap[course].courses.map((subject, index) => (
          <li key={`${subject.name}-${index}`}>
            <div className="course-item">
              <span className="course-name">{subject.name}</span>
              <span className="course-mode">{subject.mode}</span>
            </div>
            <div className="courses-content-trace" />
          </li>
        ))}
      </ul>
    </>
  )

  const mobileCourseList = useMemo(() => {
    if (!isMobile) return

    setCurrentCourse(undefined)
    const coursesContent = document.querySelector(".courses-content")

    if (!coursesContent) return

    coursesContent.replaceChildren("")

    return Object.entries(courseContentMap).map(([courseType], index) => {
      return (
        <div key={`${courseType}-${index}`} className="mobile-course-item">
          {renderCourseslist(courseType as CourseType)}
        </div>
      )
    })
  }, [isMobile])

  const handleCourseClick = contextSafe((course: CourseType) => {
    if (tl.isActive()) return
    gsap.utils
      .toArray([".courses-content > span", ".courses-content ul li"])
      .forEach((element) => {
        tl.to(element as HTMLElement, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut"
        })
      })

    if (currentCourse) {
      tl.to(
        `.${currentCourse}-trace`,
        {
          width: 0,
          duration: 0.5,
          ease: "power2.inOut"
        },
        "<"
      )
      tl.to(
        `.${currentCourse}-menu-item`,
        {
          color: "#8a959b",
          duration: 0.2,
          ease: "power2.inOut"
        },
        "<"
      )
    }

    const coursesContent = document.querySelector(`.courses-content`)
    if (!coursesContent) return

    tl.to(
      coursesContent,
      {
        opacity: 0
      },
      ">"
    )
      .then(() => {
        coursesContent.innerHTML = renderToStaticMarkup(
          renderCourseslist(course)
        )
      })
      .then(() => {
        tl.to(coursesContent, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut"
        })
        tl.to(
          `.${course}-trace`,
          {
            width: "50%",
            duration: 0.5,
            ease: "power2.inOut"
          },
          "<"
        )
        tl.to(
          `.${course}-menu-item`,
          {
            color: "white",
            duration: 0.2,
            ease: "power2.inOut"
          },
          "<"
        )
      })
    tl.call(() => {
      setCurrentCourse(course)
      tl.kill()
    })
  })

  useGSAP(function createCourseInitialAnimation() {
    ScrollTrigger.create({
      trigger: ".courses-section",
      once: true,
      id: "teste-scroll",
      onEnter: () => {
        handleCourseClick(currentCourse ?? "tecnologia")
      }
    }).disable()
  })

  useGSAP(
    function playCourseInitialAnimation() {
      if (!isMobile && !currentCourse) {
        ScrollTrigger.getById("teste-scroll")?.enable()
      } else {
        ScrollTrigger.getById("teste-scroll")?.disable()
      }
    },
    [isMobile, currentCourse]
  )

  return (
    <section className="courses-section">
      <div className="courses-header">
        <div className="title-container">
          <h2 className="courses-title">Cursos</h2>
          <h3 className="courses-subtitle">Cursos de Curta Duração</h3>
        </div>
        {!isMobile && (
          <nav className="courses-nav">
            <ul>
              <li>
                <div className="animation-trace tecnologia-trace"></div>
                <span
                  className="tecnologia-menu-item"
                  onClick={() => handleCourseClick("tecnologia")}
                >
                  TECNOLOGIA
                </span>
              </li>
              <li>
                <div className="animation-trace inovacao-trace"></div>
                <span
                  className="inovacao-menu-item"
                  onClick={() => handleCourseClick("inovacao")}
                >
                  INOVAÇÃO
                </span>
              </li>
              <li>
                <div className="animation-trace negocios-trace"></div>
                <span
                  className="negocios-menu-item"
                  onClick={() => handleCourseClick("negocios")}
                >
                  NEGÓCIOS
                </span>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <div className="courses-content">{mobileCourseList}</div>
    </section>
  )
}
