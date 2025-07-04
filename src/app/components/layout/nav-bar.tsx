import Image from "next/image"
import "./nav-bar.scss"

export function NavBar() {
  return (
    <nav className="nav-bar">
      <Image src="/svgs/logo-fiap.svg" alt="Fiap logo" width={84} height={23} />
    </nav>
  )
}
