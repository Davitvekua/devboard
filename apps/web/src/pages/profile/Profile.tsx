import { UserNameContext } from "@/context/userNameContext"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { useContext, useState } from "react"

export default function Profile() {
  const context = useContext(UserNameContext)
  const [username, setUsername] = useState(context?.userName ?? "")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    context?.setUserName(username)
  }

  return (
    <div className="flex h-full justify-center bg-white text-black">
      <div className="flex w-96 flex-col gap-5">
        <h1 className="text-xl font-bold">Profil</h1>
        <Card className="w-full max-w-sm border border-black bg-gray-100 text-black">
          <CardHeader>
            <CardTitle>Benutzername ändern</CardTitle>
            <CardDescription className="text-gray-500">
              Ändere deinen Anzeigenamen für das Kanban-Board.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="profile-form" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    id="username"
                    className="border border-gray-300 py-5"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value)
                    }}
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardAction className="ml-4">
            <Button
              variant="default"
              size={"icon-lg"}
              className="w-fit bg-blue-400 px-3"
              form="profile-form"
              type="submit"
            >
              Speichern
            </Button>
          </CardAction>
        </Card>
      </div>
    </div>
  )
}
