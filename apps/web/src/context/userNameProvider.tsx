import { useState } from "react"
import { UserNameContext } from "./userNameContext"

export default function UserNameProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [userName, setUserName] = useState(getUserNameFromLocalStorage)

  function getUserNameFromLocalStorage() {
    const userName = localStorage.getItem("kanban-user-name")

    return userName ?? ""
  }

  return (
    <UserNameContext.Provider
      value={{ userName: userName, setUserName: setUserName }}
    >
      {children}
    </UserNameContext.Provider>
  )
}
