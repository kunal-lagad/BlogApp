import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import appwriteService from "../appwrite/config"
import Container from "../components/container/Container"
import PostCard from "../components/PostCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

function AllPosts() {
  const [posts, setPosts] = useState(null)
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    if (!userData?.$id) return
    appwriteService.getPostsByUser(userData.$id).then((res) => {
      if (res) setPosts(res.documents)
      else setPosts([])
    })
  }, [userData?.$id])

  if (posts === null) {
    return (
      <div className="w-full py-10 md:py-14">
        <Container>
          <div className="mb-10 space-y-2">
            <Skeleton className="h-9 w-56 max-w-full" />
            <Skeleton className="h-4 w-80 max-w-full" />
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

  return (
    <div className="w-full py-10 md:py-14">
      <Container>
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            My posts
          </h1>
          <p className="mt-2 text-muted-foreground">
            {posts.length === 0
              ? "You have not published any posts yet."
              : `${posts.length} post${posts.length === 1 ? "" : "s"} in your library.`}
          </p>
        </div>
        {posts.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-border bg-muted/20 px-8 py-14 text-center">
            <p className="text-muted-foreground">
              You don&apos;t have any posts yet. Create one to see it here.
            </p>
            <Button className="mt-6" asChild>
              <Link to="/add-post">Add post</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts
