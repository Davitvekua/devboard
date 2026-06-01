import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { ArrowLeft, Check, Pencil, X } from "lucide-react"
import { useEffect, useReducer, useState } from "react"
import { Link, useParams } from "react-router-dom"
import BoardColumn from "./components/boardColumn"
import type { CreateTask, Task, UpdateTask } from "@/types.ts/boardTypes"
import {
  deleteTask,
  getBoardById,
  insertTask,
  updateBoard,
  updateTask,
} from "@/dataTransfer/api"
import { useBoardDetailReducer } from "@/hooks/boardDetailReducer"
import TaskDialog from "./components/taskDialog"

export default function BoardDetail() {
  const { id } = useParams()

  const [isEditingBoardName, setIsEditingBoardName] = useState(false)
  const [boardName, setBoardName] = useState("")

  const emptyBoard = {
    id: "",
    title: "",
    created_at: "",
    tasks: [],
  }

  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false)

  const [editTask, setEditTask] = useState<Task | undefined>()

  const [board, dispatchBoard] = useReducer(useBoardDetailReducer, emptyBoard)

  useEffect(() => {
    async function fetchBoard() {
      const board = await getBoardById(id ?? "")

      if (board) {
        dispatchBoard({ type: "SET_BOARD", data: board })
      }
    }

    fetchBoard()
  }, [id])

  async function handleAddTask(task: CreateTask) {
    try {
      const insertedTask = await insertTask({
        ...task,
        boardId: board?.id ?? "",
      })

      if (insertedTask) {
        dispatchBoard({ type: "ADD_TASK", data: insertedTask })
      }
    } catch (error: unknown) {
      console.error("Error adding task:", error)
    }
  }

  async function handleDeleteTask(task: Task) {
    try {
      await deleteTask(task.id)

      dispatchBoard({
        type: "DELETE_TASK",
        data: task,
      })
    } catch (error: unknown) {
      console.error("Error deleting task:", error)
    }
  }

  function handleEditTask(task: Task) {
    setEditTask(task)
    setIsEditTaskDialogOpen(true)
  }

  function handleEditBoardTitle() {
    setIsEditingBoardName(true)
    setBoardName(board.title)
  }

  async function handleSubmitEditBoardTitle() {
    if (!board) return

    const updatedBoard = await updateBoard(board.id, {
      title: boardName,
    })

    if (updatedBoard) {
      dispatchBoard({
        type: "UPDATE_BOARD_NAME",
        data: boardName,
      })

      setIsEditingBoardName(false)
    }
  }

  async function handleUpdateTask(task: UpdateTask) {
    if (!editTask) return

    try {
      const updatedTask = await updateTask(editTask.id, task)

      if (updatedTask) {
        dispatchBoard({ type: "UPDATE_TASK", data: updatedTask })
      }
    } catch (error: unknown) {
      console.error("Error updating task:", error)
    }
  }

  async function handleUpdateTaskStatus(
    id: string,
    newColumn: "Todo" | "In Progress" | "Done"
  ) {
    try {
      await updateTask(id, { column: newColumn })

      dispatchBoard({
        type: "UPDATE_TASK_STATUS",
        data: { id, newColumn },
      })
    } catch (error: unknown) {
      console.error("Error updating task status:", error)
    }
  }

  function renderBoardDetailHeader() {
    if (isEditingBoardName) {
      return (
        <>
          <Input
            value={boardName}
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
      <TaskDialog
        key={editTask?.id ?? "empty-0"}
        open={isEditTaskDialogOpen}
        handleOpenChange={setIsEditTaskDialogOpen}
        onSubmitUpdate={handleUpdateTask}
        task={
          editTask ?? {
            id: 0,
            title: "abc",
            description: "",
            column: "Todo",
            assignedTo: null,
            deadline: null,
            boardId: board.id ?? "",
            created_at: new Date().toString(),
          }
        }
      />
      <div className="mt-4 grid w-4/5 grid-cols-4 gap-4">
        <BoardColumn
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onUpdateTaskStatus={handleUpdateTaskStatus}
          title="Todo"
          tasks={board.tasks.filter((task) => task.column === "Todo")}
          handleEditTask={handleEditTask}
        />
        <BoardColumn
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onUpdateTaskStatus={handleUpdateTaskStatus}
          title="In Progress"
          tasks={board.tasks.filter((task) => task.column === "In Progress")}
          handleEditTask={handleEditTask}
        />
        <BoardColumn
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onUpdateTaskStatus={handleUpdateTaskStatus}
          title="Done"
          tasks={board.tasks.filter((task) => task.column === "Done")}
          handleEditTask={handleEditTask}
        />
      </div>
    </div>
  )
}
