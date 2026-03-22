import { useState, useEffect } from "react"
import appwriteService from "../appwrite/config"
import Container from "../components/container/Container"
import PostCard from "../components/PostCard"
import { Skeleton } from "@/components/ui/skeleton"

function Home() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    appwriteService.getPosts([]).then((res) => {
      if (res) setPosts(res.documents)
      else setPosts([])
    })
  }, [])

  if (posts === null) {
    return (
      <div className="w-full py-10 md:py-14">
        <Container>
          <div className="mb-10 space-y-2">
            <Skeleton className="h-9 w-48 max-w-full" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        </Container>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-border bg-muted/20 px-8 py-14 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">No posts yet</h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to create a post, or check back later for new stories.
            </p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="w-full py-10 md:py-14">
      <Container>
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Latest posts
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Discover ideas, tutorials, and updates from the community.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
