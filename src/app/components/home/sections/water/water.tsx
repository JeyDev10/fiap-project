import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

import "./water.scss"

export function WaterSection() {
  useGSAP(() => {
    const canvas = document.getElementById("water-canvas") as HTMLCanvasElement
    const context = canvas.getContext("2d")
    canvas.width = 1920
    canvas.height = 1080
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

    console.log("images", images)

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
      context?.clearRect(0, 0, canvas.width, canvas.height)
      context?.drawImage(images[water.frame], 0, 0)
    }
  })

  return (
    <section className="water-section">
      <canvas id="water-canvas" />
    </section>
  )
}
