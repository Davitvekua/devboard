import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { ArrowLeft, Check, Pencil, X } from "lucide-react"
import { useReducer, useState } from "react"
import { Link, useParams } from "react-router-dom"
import BoardColumn from "./components/boardColumn"
import type { Board, Task } from "@/types.ts/boardTypes"
import { getBoardById, getBoards } from "@/dataTransfer/api"
import { useBoardDetailReducer } from "@/hooks/boardDetailReducer"

export default function BoardDetail() {
  const { id } = useParams()

  const [isEditingBoardName, setIsEditingBoardName] = useState(false)
  const [boardName, setBoardName] = useState("")

  const boardFromLocalStorage = getBoardById(id ?? "") ?? {
    id: "",
    title: "",
    tasks: [],
  }

  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(true)

  const [editTask, setEditTask] = useState<Task | undefined>()

  const [board, dispatchBoard] = useReducer(
    useBoardDetailReducer,
    boardFromLocalStorage
  )

  function handleAddTask(task: Task) {
    dispatchBoard({ type: "ADD_TASK", data: task })
  }

  function handleDeleteTask(task: Task) {
    dispatchBoard({ type: "DELETE_TASK", data: task })
  }

  function handleEditTask(task: Task) {
    console.log(task)
    setEditTask(task)
    setIsEditTaskDialogOpen(true)
  }

  function handleEditBoardTitle() {
    setIsEditingBoardName(true)
    setBoardName(board.title)
  }

  function handleSubmitEditBoardTitle() {
    dispatchBoard({ type: "UPDATE_BOARD_NAME", data: boardName })
    setIsEditingBoardName(false)
  }

  function renderBoardDetailHeader() {
    if (isEditingBoardName) {
      return (
        <>
          <Input
            value={board.title}
            className="w-96"
            onChange={(event) => setBoardName(event.target.value)}
          />

          <Button
            variant="ghost"
            size={"icon-lg"}
            onClick={handleSubmitEditBoardTitle}
          >
            <Check className="size-5" />
          </Button>

          <Button
            variant="ghost"
            size={"icon-lg"}
            onClick={() => setIsEditingBoardName(false)}
          >
            <X className="size-5" />
          </Button>
        </>
      )
    } else {
      return (
        <>
          <h1 className="text-2xl font-bold">{board.title}</h1>

          <Button
            variant="ghost"
            size={"icon-lg"}
            onClick={handleEditBoardTitle}
          >
            <Pencil className="size-5" />
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
        {renderBoardDetailHeader()}
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
}
