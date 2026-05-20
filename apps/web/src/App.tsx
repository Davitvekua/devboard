import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Profile from "./pages/profile/Profile"
import Overview from "./pages/boardOverview/boardOverview"
import Detail from "./pages/boardDetail/boardDetail"
import RootRoute from "./pages/root"
import ErrorPage from "./pages/errorRoute/errorRoute"
import UserNameProvider from "./context/userNameProvider"

export function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <RootRoute />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/boards" replace />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "boards",
            children: [
              { index: true, element: <Overview /> },
              { path: ":id", element: <Detail /> },
            ],
          },
        ],
      },
    ],
    { basename: "/devboard" }
  )

  return (
    <UserNameProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserNameProvider>
  )
}
