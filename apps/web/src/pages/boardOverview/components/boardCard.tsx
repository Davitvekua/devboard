import type { Board } from "@/types.ts/boardTypes"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
} from "@workspace/ui/components/card"
import { Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

export default function BoardCard({
  board,
  onDelete,
}: {
  board: Board
  onDelete: (id: string) => void
}) {
  return (
    <Link to={"/boards/123"}>
      <Card className="border border-black bg-white text-black transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle>{board.title}</CardTitle>
          <CardDescription>
            3 Spalten. {board.tasks.length} Tasks
          </CardDescription>
          <CardAction>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="hover:text-destructive"
              onClick={(e) => {
                ;(e.preventDefault(), onDelete(board.id))
              }}
            >
              <Trash2></Trash2>
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  )
}
