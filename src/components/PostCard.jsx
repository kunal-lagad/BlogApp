import { Link } from "react-router-dom"
import appwriteService from "../appwrite/config.js"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-border/80 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ring/40 hover:shadow-md">
        <div className="flex min-h-[11rem] w-full items-center justify-center bg-muted/90 p-3 sm:min-h-[13rem]">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="max-h-44 w-full max-w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02] sm:max-h-52"
          />
        </div>
        <CardContent className="pt-4 pb-2">
          <h2 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight text-card-foreground group-hover:text-primary">
            {title}
          </h2>
        </CardContent>
        <CardFooter className="border-t border-border/50 bg-muted/30">
          <span className="text-xs font-medium text-muted-foreground">
            Read article
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default PostCard
