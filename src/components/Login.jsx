import authService from "../appwrite/auth"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Button from "./Button"
import Input from "./Input"
import Logo from "./Logo"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { login as authLogin } from "../store/authSlice"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin({ userData }))
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
            Sign in
          </CardTitle>
          <CardDescription>
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Create one
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit(login)} className="space-y-4">
            <Input
              label="Email"
              placeholder="you@example.com"
              type="email"
              {...register("email", { required: true })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
