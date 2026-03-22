import Container from "../container/Container"
import Logo from "../Logo"
import { Link, useNavigate, useLocation } from "react-router-dom"
import LogoutBtn from "./LogoutBtn"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "My Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  const isActive = (slug) => location.pathname === slug

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <Container>
        <nav className="flex h-14 items-center gap-4 md:h-16">
          <Link to="/" className="mr-auto flex shrink-0 items-center gap-2 rounded-lg outline-none ring-offset-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring">
            <Logo width="70px" />
          </Link>
          <ul className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "text-muted-foreground hover:text-foreground",
                      isActive(item.slug) && "bg-muted/80 font-medium text-foreground"
                    )}
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </Button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
