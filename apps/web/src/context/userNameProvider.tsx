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

  function handleSetUserName(name: string) {
    setUserName(name)
    localStorage.setItem("kanban-user-name", name)
  }

  return (
    <UserNameContext.Provider
      value={{ userName: userName, setUserName: handleSetUserName }}
    >
      {children}
    </UserNameContext.Provider>
  )
}
