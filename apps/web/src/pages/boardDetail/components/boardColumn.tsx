import { Button } from "@workspace/ui/components/button"
import { Plus } from "lucide-react"
import TaskCard from "./taskCard"
import type { Task } from "@/types.ts/boardTypes"
import { useState } from "react"

export default function boardColumn({
  title,
  tasks,
}: {
  title: string
  tasks: Task[]
}) {
  const [isDragHover, setIsDragHover] = useState(false)

  function isColumnInTasks(column: string) {
    return column === title
  }

  function handleDragHover(event: React.DragEvent<HTMLDivElement>) {
    const taskColumn = event.dataTransfer.getData("taskColumn")
    console.log(taskColumn)

    if (isColumnInTasks(taskColumn)) {
      setIsDragHover(false)
    } else {
      setIsDragHover(true)
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const taskColumn = event.dataTransfer.getData("taskColumn")

    if (isColumnInTasks(taskColumn)) {
      setIsDragHover(false)
    } else {
    }
  }

  return (
    <div
      className={`rounded-lg border border-black bg-gray-100 text-black ${isDragHover && ""}`}
      onDrop={handleDrop}
      onDragEnter={handleDragHover}
      onDragLeave={() => setIsDragHover(false)}
      onDragOver={handleDragHover}
    >
      <div className="flex items-center justify-between border-b border-black p-4 text-black">
        <h3 className="font-bold">{title}</h3>
        <Button variant={"ghost"} size={"icon-lg"}>
          <Plus />
        </Button>
      </div>
      <div
        className={`mx-3 mt-3 rounded-sm border-2 border-dashed border-blue-400 bg-blue-50 py-1 text-center text-blue-500 ${!isDragHover && "hidden"}`}
        onDrop={() => setIsDragHover(false)}
      >
        Hier ablegen
      </div>
      <div className="p-3">
        {tasks.map((task) => {
          return <TaskCard task={task} />
        })}
      </div>
    </div>
  )
}
