import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { ArrowLeft, Check, Pencil, X } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import BoardColumn from "./components/boardColumn"
import type { Board } from "@/types.ts/boardTypes"

export default function Detail() {
  const { id } = useParams()
  const [editBoardName, setEditBoardName] = useState(false)
  const [boardName, setBoardName] = useState("Name des Boardes")

  const [board, setBoard] = useState<Board>({
    id: "1",
    title: "test",
    tasks: [
      { id: "1", title: "abc", column: "In Progress", description: "def" },
      { id: "2", title: "dfg", column: "Todo", description: "bla" },
    ],
  })

  function renderBoarddetailHeader() {
    if (editBoardName) {
      return (
        <>
          <Input
            className="w-fit"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
          <Button
            variant={"ghost"}
            size={"icon-lg"}
            onClick={() => setEditBoardName(false)}
          >
            <Check />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon-lg"}
            onClick={() => setEditBoardName(false)}
          >
            <X />
          </Button>
        </>
      )
    } else {
      return (
        <>
          <h1 className="text-2xl font-bold">{boardName}</h1>
          <Button
            variant={"ghost"}
            size={"icon-lg"}
            onClick={() => setEditBoardName(true)}
          >
            <Pencil />
          </Button>
        </>
      )
    }
  }
  return (
    <div className="flex h-full flex-col items-center bg-white text-black">
      <div className="flex w-4/5 flex-row items-center gap-2">
        <Link to={"/boards"}>
          <Button variant={"ghost"} size={"icon-lg"}>
            <ArrowLeft />
          </Button>
        </Link>
        {renderBoarddetailHeader()}
      </div>
      <div className="mt-4 grid w-4/5 grid-cols-4 gap-4">
        <BoardColumn
          title="Todo"
          tasks={board.tasks.filter((task) => task.column === "Todo")}
        />
        <BoardColumn
          title="In Progress"
          tasks={board.tasks.filter((task) => task.column === "In Progress")}
        />
        <BoardColumn
          title="Done"
          tasks={board.tasks.filter((task) => task.column === "Done")}
        />
      </div>
    </div>
  )
  // return <>Detail: {id}</>
}
