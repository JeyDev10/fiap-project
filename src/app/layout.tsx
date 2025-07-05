import type { Metadata } from "next"
import Image from "next/image"

import { NavBar } from "@/app/components/layout/nav-bar"

import "./globals.css"

export const metadata: Metadata = {
  title: "FIAP Project",
  description: "FIAP Project - Next.js 14"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
