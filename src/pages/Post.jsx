import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import appwriteService from "../appwrite/config"
import Container from "../components/container/Container"
import parse from "html-react-parser"
import { useSelector } from "react-redux"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button as UIButton } from "@/components/ui/button"

function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((p) => {
        if (p) {
          setPost(p)
        } else {
          navigate("/")
        }
      })
    }
  }, [slug, navigate])

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage)
        navigate("/")
      }
    })
  }

  return post ? (
    <div className="py-8 md:py-12">
      <Container>
        <div className="mx-auto max-w-3xl">
          {isAuthor && (
            <div className="mb-6 flex flex-wrap items-center justify-end gap-2">
              <UIButton variant="outline" size="sm" asChild>
                <Link to={`/edit-post/${post.$id}`}>Edit</Link>
              </UIButton>
              <UIButton variant="destructive" size="sm" onClick={deletePost}>
                Delete
              </UIButton>
            </div>
          )}
          <Card className="overflow-hidden border-border/80 bg-card/90 shadow-sm">
            <div className="flex w-full justify-center border-b border-border/50 bg-muted/40 px-4 py-6 md:px-8 md:py-10">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="h-auto max-h-[min(70vh,560px)] w-full max-w-full object-contain"
              />
            </div>
            <CardContent className="space-y-6 p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">Article</Badge>
              </div>
              <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {post.title}
              </h1>
              <div className="browser-css max-w-none text-base leading-relaxed text-foreground [&_img]:h-auto [&_img]:max-w-full [&_img]:object-contain [&_p]:mb-4">
                {parse(post.content)}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post
