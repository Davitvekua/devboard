import type { Task } from "@/types.ts/boardTypes"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Trash2 } from "lucide-react"

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Card
      className="border border-black bg-gray-50 text-black"
      draggable={true}
      onDragStart={(e) => e.dataTransfer.setData("taskColumn", task.column)}
    >
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
        <CardAction>
          <Button
            className="text-muted-foreground hover:text-destructive"
            variant={"ghost"}
            size={"icon-lg"}
          >
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
