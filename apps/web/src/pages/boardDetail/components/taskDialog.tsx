import { useContext, useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { format } from "date-fns"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import type { CreateTask, Task } from "@/types.ts/boardTypes"
import { Textarea } from "@workspace/ui/components/textarea"
import { Button } from "@workspace/ui/components/button"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@workspace/ui/components/calendar"
import { UserNameContext } from "@/context/userNameContext"

export default function TaskDialog({
  open,
  handleOpenChange,
  onSubmitUpdate,
  task,
}: {
  open: boolean
  handleOpenChange: (open: boolean) => void
  onSubmitUpdate: (task: CreateTask) => void
  task: Task
}) {
  const [date, setDate] = useState<Date>(new Date(task.deadline ?? new Date()))
  const [taskTitle, setTaskTitle] = useState<string>(task.title)
  const [taskDescription, setTaskDescription] = useState<string>(
    task.description ?? ""
  )
  const [selectedPerson, setSelectedPerson] = useState<string>(
    task.assignedTo ?? "none"
  )
  const context = useContext(UserNameContext)

  function handleSubmitUpdate() {
    const updatedTask: CreateTask = {
      title: taskTitle,
      description: taskDescription,
      deadline: date?.toISOString() ?? null,
      assignedTo: selectedPerson === " " ? null : selectedPerson,
      column: task.column,
      boardId: task.boardId ?? "",
    }
    onSubmitUpdate(updatedTask)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-gray-100 text-black">
        <DialogHeader>
          <DialogTitle>Task bearbeiten</DialogTitle>
          <DialogDescription>
            Bearbeite ausgewählte Aufgabe für diese Spalte.
          </DialogDescription>
        </DialogHeader>
        <div>
          <span>Titel</span>
          <Input
            className="border-2 border-gray-300"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>
        <div>
          <span>Beschreibung</span>
          <Textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="border-2 border-gray-300"
          />
        </div>
        <div>
          <span>Zugewiesen an</span>
          <Select value={selectedPerson} onValueChange={setSelectedPerson}>
            <SelectTrigger className="w-full border-2 border-gray-300">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="bg-gray-200 text-black">
              <SelectGroup>
                <SelectItem value="none">Keine Zuweisung</SelectItem>
                {context?.userName && (
                  <SelectItem value={context.userName}>
                    {context.userName}
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <span>Deadline</span>
          <Popover>
            <PopoverTrigger asChild className="w-full border-2 border-gray-300">
              <Button
                variant="outline"
                data-empty={!date}
                className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
              >
                {date ? format(date, "dd.MM.yyyy") : <span>Pick a date</span>}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto bg-gray-200 p-0 text-black"
              align="start"
            >
              <Calendar
                required
                mode="single"
                selected={date}
                onSelect={setDate}
                defaultMonth={date}
              />
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter className="bg-gray-100">
          <DialogClose>
            <Button variant={"outline"}>Abbrechen</Button>
          </DialogClose>
          {taskTitle === "" ? (
            <Button disabled>Speichern</Button>
          ) : (
            <DialogClose>
              <Button onClick={handleSubmitUpdate}>Speichern</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
