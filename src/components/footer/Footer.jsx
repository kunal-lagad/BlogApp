import { Link } from "react-router-dom"
import Logo from "../Logo"
import { Separator } from "@/components/ui/separator"

function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo width="80px" />
            <p className="max-w-sm text-sm text-muted-foreground">
              A clean space to write, publish, and read stories. Built with React and Appwrite.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  className="text-foreground/90 transition-colors hover:text-foreground"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/90 transition-colors hover:text-foreground"
                  to="/all-posts"
                >
                  My posts
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/90 transition-colors hover:text-foreground"
                  to="/add-post"
                >
                  New post
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Account
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  className="text-foreground/90 transition-colors hover:text-foreground"
                  to="/login"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  className="text-foreground/90 transition-colors hover:text-foreground"
                  to="/signup"
                >
                  Create account
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-muted-foreground">Terms &amp; Conditions</span>
              </li>
              <li>
                <span className="text-muted-foreground">Privacy Policy</span>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Blog. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
