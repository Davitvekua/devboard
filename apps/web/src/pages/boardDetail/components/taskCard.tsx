import type { Task } from "@/types.ts/boardTypes"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Calendar, CircleUser, Trash2 } from "lucide-react"

export default function TaskCard({
  task,
  onDeleteTask,
  handleEditTask,
}: {
  task: Task
  onDeleteTask: (task: Task) => void
  handleEditTask: (task: Task) => void
}) {
  return (
    <Card
      className="border border-black bg-gray-50 text-black hover:cursor-pointer"
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData(`column-${task.column}`, "")
        e.dataTransfer.setData(`id-${task.id}`, "")
      }}
      onClick={() => handleEditTask(task)}
    >
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription className="flex flex-col">
          {task.description && <span>{task.description}</span>}

          {task.assignedTo !== " " && task.assignedTo && (
            <span className="flex items-center gap-1">
              <CircleUser className="size-3" />
              {task.assignedTo}
            </span>
          )}

          {task.deadline && (
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {new Date(task.deadline ?? new Date()).toLocaleDateString(
                "de-DE"
              )}
            </span>
          )}
        </CardDescription>
        <CardAction>
          <Button
            className="text-muted-foreground hover:text-destructive"
            variant={"ghost"}
            size={"icon-lg"}
            onClick={(e) => {
              ;(e.stopPropagation(), onDeleteTask(task))
            }}
          >
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
