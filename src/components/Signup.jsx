import authService from "../appwrite/auth"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Button from "./Button"
import Input from "./Input"
import Logo from "./Logo"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { login } from "../store/authSlice"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const create = async (data) => {
    setError("")
    try {
      const account = await authService.createAccount(data)
      if (account) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(login({ userData }))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md border-border/80 bg-card/90 shadow-lg backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex w-full max-w-[100px] justify-center">
            <Logo width="100%" />
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Create account
          </CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit(create)} className="space-y-4">
            <Input
              {...register("name", { required: true })}
              label="Full name"
              placeholder="Jane Doe"
            />
            <Input
              {...register("email", { required: true })}
              label="Email"
              placeholder="you@example.com"
              type="email"
            />
            <Input
              {...register("password", { required: true })}
              label="Password"
              type="password"
              placeholder="••••••••"
            />
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup
