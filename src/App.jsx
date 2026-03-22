import { useState, useEffect } from "react"
import "./App.css"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login, logout } from "./store/authSlice"
import Header from "./components/Header/Header"
import Footer from "./components/footer/Footer"
import authService from "./appwrite/auth"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }))
        else dispatch(logout())
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.12),transparent)]" />
      <Header />
      <main className="flex-1">
        {loading ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-y-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
