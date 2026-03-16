import Navbar  from './Navbar'
import Footer  from './Footer'
import ToastContainer from '@/components/ui/ToastContainer'

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen font-syne">
      {/* Grid background fixed layer */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />

      {/* Orange corner radial glow */}
      <div
        className="fixed pointer-events-none z-0 orange-glow-corner"
        style={{ top: -200, right: -200, width: 600, height: 600 }}
      />

      {/* App content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 w-full mx-auto px-6 md:px-36 pb-20">
          {children}
        </main>
        <Footer />
      </div>

      <ToastContainer />
    </div>
  )
}
