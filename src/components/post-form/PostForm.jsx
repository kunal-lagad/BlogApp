import React, { useCallback } from "react"
import { useForm } from "react-hook-form"
import Button from "../Button"
import Input from "../Input"
import RTE from "../RTE"
import Select from "../Select"
import appwriteSerice from "../../appwrite/config"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteSerice.uploadFile(data.image[0])
        : null

      if (file) {
        appwriteSerice.deleteFile(post.featuredImage)
      }
      const dbPost = await appwriteSerice.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      })
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      const file = await appwriteSerice.uploadFile(data.image[0])
      if (file) {
        const fileId = file.$id
        data.featuredImage = fileId
        const dbPost = await appwriteSerice.createPost({
          ...data,
          userId: userData.$id,
        })

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
  }, [])

  React.useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        })
      }
    })
  }, [watch, slugTransform, setValue])

  return (
    <Card className="mx-auto max-w-5xl border-border/80 bg-card/90 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {post ? "Edit post" : "New post"}
        </CardTitle>
        <CardDescription>
          {post
            ? "Update your title, content, or featured image."
            : "Write your story and publish when you are ready."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submit)} className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
            <div className="min-w-0 space-y-4">
              <Input
                label="Title"
                placeholder="Post title"
                {...register("title", { required: true })}
              />
              <Input
                label="Slug"
                placeholder="url-friendly-slug"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue(
                    "slug",
                    slugTransform(e.currentTarget.value),
                    { shouldValidate: true }
                  )
                }}
              />
              <RTE
                label="Content"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
            <div className="space-y-4 lg:border-l lg:border-border/60 lg:pl-8">
              <Input
                label="Featured image"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                {...register("image", { required: !post })}
              />
              {post && (
                <div className="flex justify-center overflow-hidden rounded-lg border border-border bg-muted/30 p-2">
                  <img
                    src={appwriteSerice.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="max-h-72 w-full max-w-full object-contain"
                  />
                </div>
              )}
              <Select
                options={["active", "inactive"]}
                label="Status"
                {...register("status", { required: true })}
              />
              <Separator className="lg:hidden" />
              <Button
                type="submit"
                className="w-full"
                bgColor={post ? "bg-green-500" : undefined}
              >
                {post ? "Update" : "Publish"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
