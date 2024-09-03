import Navbar from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className="flex flex-col text-light">
      <div className="sticky top-0">
        <Navbar />
      </div>
      <section className="w-full flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full"> 
          {children}
        </main>
      </section>
    </body>
  )
}