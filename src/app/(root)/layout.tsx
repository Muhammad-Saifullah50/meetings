import Navbar from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className="flex flex-col">
      <div>
      <Navbar />
      </div>
      <section className="w-full flex h-screen overflow-hidden">
        <Sidebar />
        {children}
      </section>
    </body>
  )
}