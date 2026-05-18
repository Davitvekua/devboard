import { Button } from "@workspace/ui/components/button"
import BoardCard from "./components/boardCard"
import { useReducer, useState } from "react"
import type { Board } from "@/types.ts/boardTypes"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Plus } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import useBoardOverviewReducer from "@/hooks/boardsOverviewReducer"
import { getBoards } from "@/dataTransfer/api"

export default function Overview() {
  const [boardNameInput, setBoardNameInput] = useState("")
  const [boards, boardsdispatch] = useReducer(
    useBoardOverviewReducer,
    [],
    getBoards
  )

  function handleAddNewBoard() {
    const newBoard: Board = {
      id: String(crypto.randomUUID()),
      title: boardNameInput,
      tasks: [],
    }

    boardsdispatch({ type: "ADD", data: newBoard })
    setBoardNameInput("")
  }

  function handleDeleteBorad(id: string) {
    boardsdispatch({ type: "DELETE", data: { id: id, title: "", tasks: [] } })
  }

  return (
    <div className="flex h-full flex-col items-center bg-white">
      <div className="flex w-4/5 flex-row justify-between p-2">
        <h1 className="text-2xl font-bold text-black">Meine Borads</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-400 p-5">
              <Plus className="size-5" />
              Neues Board
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-gray-50 text-black">
            <DialogHeader>
              <DialogTitle>Neues Board erstellen</DialogTitle>

              <DialogDescription>
                Gib dem Board einen Namen. Es werden automatisch drei Spalten
                angelegt (To Do, In Progress, Done).
              </DialogDescription>
            </DialogHeader>

            <Input
              id="name-1"
              name="name"
              defaultValue="Initial Name"
              value={boardNameInput}
              className="border-none shadow-none ring-0 outline-none"
              onChange={(e) => setBoardNameInput(e.target.value)}
            />

            <DialogFooter className="bg-gray-100">
              <DialogClose>
                <Button variant={"outline"}>Abbrechen</Button>
              </DialogClose>

              <DialogClose>
                <Button className="bg-blue-400" onClick={handleAddNewBoard}>
                  Speicher
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid w-4/5 grid-cols-3 grid-rows-3 gap-4 p-2 text-black">
        {boards.map((board) => {
          return <BoardCard board={board} onDelete={handleDeleteBorad} />
        })}
      </div>
    </div>
  )
}
