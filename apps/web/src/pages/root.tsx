import { UserNameContext } from "@/context/userNameContext"
import { CircleUser, LayoutDashboard } from "lucide-react"
import { useContext } from "react"
import { Link, Outlet } from "react-router-dom"

export default function RootRoute() {
  const context = useContext(UserNameContext)
  const userName = context?.userName || "Profil"

  return (
    <div className="h-full bg-white text-black">
      <div className="mb-5 flex items-center justify-center bg-black py-4">
        <div className="flex w-4/5 justify-between">
          <Link to={"/boards"} className="flex gap-1.5 font-bold text-blue-400">
            <LayoutDashboard />
            Devboard
          </Link>
          <Link
            to={"/profile"}
            className="flex gap-1.5 text-white hover:text-blue-400"
          >
            <CircleUser className="text-gray-400 hover:text-blue-400" />
            {userName}
          </Link>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
