import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import { Textarea } from "@workspace/ui/components/textarea"
import { ChevronDownIcon, Plus, SpaceIcon } from "lucide-react"
import TaskCard from "./taskCard"
import type { Task } from "@/types.ts/boardTypes"
import { useContext, useState } from "react"
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
import { UserNameContext } from "@/context/userNameContext"

export default function boardColumn({
  title,
  tasks,
  onAddTask,
  onDeleteTask,
  onUpdateTaskStatus,
  handleEditTask,
}: {
  title: "Todo" | "In Progress" | "Done"
  tasks: Task[]
  onAddTask: (task: Task) => void
  onDeleteTask: (task: Task) => void
  onUpdateTaskStatus: (
    id: string,
    newColumn: "Todo" | "In Progress" | "Done"
  ) => void
  handleEditTask: (task: Task) => void
}) {
  const [isDragHover, setIsDragHover] = useState(false)
  const [date, setDate] = useState<Date>()
  const [taskTitle, setTaskTitle] = useState<string>("")
  const [taskDescription, setTaskDescription] = useState<string>("")
  const [selectedPerson, setSelectedPerson] = useState<string>(" ")
  const context = useContext(UserNameContext)

  function isColumnInTasks(column: string | null) {
    return column?.toLowerCase() === title.toLowerCase()
  }

  function getColumnFromDraggedItem(dataTransfer: DataTransfer): string | null {
    let column: string | null = null
    dataTransfer.types.forEach((type) => {
      if (type.startsWith("column-")) {
        column = type.replace("column-", "")
      }
    })
    return column
  }

  function getIdFromDraggedItem(dataTransfer: DataTransfer): string | null {
    let column: string | null = null
    dataTransfer.types.forEach((type) => {
      if (type.startsWith("id-")) {
        column = type.replace("id-", "")
      }
    })
    return column
  }

  function handleDragHover(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const column = getColumnFromDraggedItem(event.dataTransfer)

    if (isColumnInTasks(column)) {
      setIsDragHover(false)
    } else {
      setIsDragHover(true)
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const column = getColumnFromDraggedItem(event.dataTransfer)
    const id = getIdFromDraggedItem(event.dataTransfer) ?? ""

    if (isColumnInTasks(column)) {
      setIsDragHover(false)
    } else {
      onUpdateTaskStatus(id, title)
      setIsDragHover(false)
    }
  }

  function handleAddNewTask() {
    const newTask: Task = {
      id: String(crypto.randomUUID()),
      title: taskTitle,
      description: taskDescription ?? "",
      column: title,
      assignedTo: selectedPerson,
      deadline: date?.toISOString() ?? undefined,
    }

    onAddTask(newTask)
    setTaskTitle("")
    setTaskDescription("")
    setSelectedPerson("")
    setDate(undefined)
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    const nextElement = event.relatedTarget as Node | null
    if (nextElement && event.currentTarget.contains(nextElement)) {
      return
    }
    setIsDragHover(false)
  }

  return (
    <div
      className={`rounded-lg border border-black bg-gray-100 text-black ${isDragHover && ""}`}
      onDrop={handleDrop}
      onDragEnter={handleDragHover}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragHover}
    >
      <div className="flex items-center justify-between border-b border-black p-4 text-black">
        <h3 className="font-bold">
          {title}{" "}
          <span className="ml-2 text-sm font-normal">{tasks.length}</span>
        </h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon-lg">
              <Plus />
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-gray-100 text-black">
            <DialogHeader>
              <DialogTitle>Neue Task erstellen</DialogTitle>
              <DialogDescription>
                Erstelle eine neue Aufgabe für diese Spalte.
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
                    <SelectItem value=" ">Keine Zuweisung</SelectItem>
                    <SelectItem value={context?.userName ?? "Undefinde"}>
                      {context?.userName ?? "Undefinde"}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <span>Deadline</span>
              <Popover>
                <PopoverTrigger
                  asChild
                  className="w-full border-2 border-gray-300"
                >
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto bg-gray-200 p-0 text-black"
                  align="start"
                >
                  <Calendar
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
                  <Button className="bg-blue-400" onClick={handleAddNewTask}>
                    Speicher
                  </Button>
                </DialogClose>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div
        className={`mx-3 mt-3 rounded-sm border-2 border-dashed border-blue-400 bg-blue-50 py-1 text-center text-blue-500 ${!isDragHover && "hidden"}`}
        onDrop={() => setIsDragHover(false)}
      >
        Hier ablegen
      </div>
      <div className="flex flex-col gap-2 p-3">
        {tasks.length === 0 && (
          <p className="text-center text-sm">Keine Tasks</p>
        )}
        {tasks.map((task) => {
          return (
            <TaskCard
              onDeleteTask={onDeleteTask}
              task={task}
              handleEditTask={handleEditTask}
            />
          )
        })}
      </div>
    </div>
  )
}
