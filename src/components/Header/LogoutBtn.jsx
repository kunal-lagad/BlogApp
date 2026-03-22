import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth.js"
import { logout } from "../../store/authSlice.js"
import { Button } from "@/components/ui/button"

function LogoutBtn() {
  const dispatch = useDispatch()

  const lougoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }
  return (
    <Button variant="outline" size="sm" onClick={lougoutHandler}>
      Logout
    </Button>
  )
}

export default LogoutBtn
