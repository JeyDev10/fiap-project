import { useEffect } from "react"

import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

export function WaterSection() {
  useGSAP(() => {
    const canvas = document.getElementById("water-canvas") as HTMLCanvasElement
    const context = canvas.getContext("2d")
    canvas.width = window.innerWidth > 1920 ? 1920 : window.innerWidth
    canvas.height = window.innerHeight > 1080 ? 1080 : window.innerHeight

    canvas.style.display = "block"
    canvas.style.margin = "0 auto"

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth > 1920 ? 1920 : window.innerWidth
      canvas.height = window.innerHeight > 1080 ? 1080 : window.innerHeight
    })

    if (!context) return
    const frameCount = 191
    const currentFrame = (index: number): string =>
      `/imgs/water/water_${index.toString().padStart(3, "0")}.jpg`

    const images: HTMLImageElement[] = []
    const water = {
      frame: 0
    }

    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      img.src = currentFrame(i)
      images.push(img)
    }

    gsap.to(water, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: ".image-container",
        scrub: 1,
        start: "bottom bottom",
        end: "+=1000"
      },
      markers: true,
      onUpdate: render
    })

    images[0].onload = render

    function render() {
      const img = images[water.frame]
      context?.clearRect(0, 0, canvas.width, canvas.height)
      const hRatio = canvas.width / img.width
      const vRatio = canvas.height / img.height
      const ratio = Math.max(hRatio, vRatio)
      const newWidth = img.width * ratio
      const newHeight = img.height * ratio
      const x = (canvas.width - newWidth) / 2
      const y = (canvas.height - newHeight) / 2
      context?.drawImage(img, x, y, newWidth, newHeight)
    }
  }, [])

  return (
    <section className="water-section">
      <canvas id="water-canvas" />
    </section>
  )
}
