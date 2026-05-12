import { CircleUser, LayoutDashboard } from "lucide-react"
import { Link, Outlet } from "react-router-dom"

export default function RootRoute() {
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
            <CircleUser className="text-gray-400 hover:text-blue-400" /> Davit
          </Link>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
